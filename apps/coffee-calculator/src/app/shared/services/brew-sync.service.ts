import { inject, Injectable } from '@angular/core';
import { Brewing } from '@domain/brewing';
import { User } from '@domain/user';
import { concatMap, forkJoin, from, map, mergeMap } from 'rxjs';
import { BrewingRepository } from 'src/app/features/brewing/domain';
import {
  BREWING_REPOSITORY,
  REMOTE_BREWING_REPOSITORY,
} from 'src/app/features/brewing/infra';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class BrewSyncService {
  private remoteBrewingRepo = inject(REMOTE_BREWING_REPOSITORY);
  private brewingRepo = inject(BREWING_REPOSITORY);
  private appState = inject(AppStateService);

  sync() {
    const user = this.appState.currentUser;

    if (!user) return;
    this.appState.setSyncing(true);
    forkJoin([
      this.brewingRepo.listBrewings(),
      this.remoteBrewingRepo.listBrewings({
        userId: user.getId(),
      }),
    ])
      .pipe(
        map(brewings => this.setBrewingsAuthor(brewings, user)),
        mergeMap(([localBrewings, remoteBrewings]) => {
          const syncOperations: {
            payload: Brewing,
            repository: BrewingRepository,
            operation: 'save' | 'update'
          }[] = [];

          // Handle local brewings
          for (const localBrewing of localBrewings) {
            const remoteBrewing = remoteBrewings.find(
              remote => remote.getId() === localBrewing.getId()
            );

            if (!remoteBrewing) {
              syncOperations.push({
                payload: localBrewing,
                repository: this.remoteBrewingRepo,
                operation: 'save'
              });
            } else if (
              localBrewing.getUpdatedAt() > remoteBrewing.getUpdatedAt()
            ) {
              syncOperations.push({
                payload: localBrewing,
                repository: this.remoteBrewingRepo,
                operation: 'update'
              });
            } else {
              syncOperations.push({
                payload: remoteBrewing,
                repository: this.brewingRepo,
                operation: 'update'
              });
            }
          }

          // Handle remote brewings that don't exist locally
          for (const remoteBrewing of remoteBrewings) {
            if (!localBrewings.find(
              local => local.getId() === remoteBrewing.getId()
            )) {
              syncOperations.push({
                payload: remoteBrewing,
                repository: this.brewingRepo,
                operation: 'save'
              });
            }
            const localBrewing = localBrewings.find(
              local => local.getId() === remoteBrewing.getId()
            );
            
            // If the local brewing is not the same as the remote brewing,
            // update the local brewing
            if (
              localBrewing
              && remoteBrewing.getUpdatedAt() > localBrewing.getUpdatedAt()
            ) {
              syncOperations.push({
                payload: remoteBrewing,
                repository: this.brewingRepo,
                operation: 'update'
              });
            }
          }

          // Execute operations sequentially
          return from(syncOperations).pipe(
            concatMap(operation => this.execute(
              operation.payload,
              operation.repository,
              operation.operation
            ))
          );
        })
      )
      .subscribe({
        complete: () => this.appState.setSyncing(false),
        error: (error) => {
          console.error('Sync error:', error);
          this.appState.setSyncing(false);
        }
      });
  }

  private execute(
    payload: Brewing,
    repository: BrewingRepository,
    operation: 'save' | 'update') {
    if (operation === 'save') {
      return from(repository.save(payload));
    } else {
      return from(repository.update(payload));
    }
  }

  private setBrewingsAuthor(brewings: [Brewing[], Brewing[]], user: User) {
    const [localBrewings] = brewings;

    localBrewings.forEach(brewing => {
      if (!brewing.getAuthor()) {
        brewing.setAuthor({ id: user.getId(), name: user.getName() });
      }
    });

    return brewings;
  }
}

import { inject, Injectable } from '@angular/core';
import { forkJoin, map, mergeMap } from 'rxjs';
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
        userId: user.id,
      }),
    ])
      .pipe(
        map(brewings => {
          const [localBrewings] = brewings;

          localBrewings.forEach(brewing => {
            if (!brewing.getAuthor()) {
              brewing.setAuthor({ id: user.id, name: user.name });
            }
          });

          return brewings;
        }),
        mergeMap(([localBrewings, remoteBrewings]) => {
          const syncLocals = localBrewings.map(localBrewing => {
            const remoteBrewing = remoteBrewings.find(
              remote => remote.getId() === localBrewing.getId()
            );

            if (!remoteBrewing)
              return this.remoteBrewingRepo.save(localBrewing);
            else if (localBrewing.getUpdatedAt() > remoteBrewing.getUpdatedAt())
              return this.remoteBrewingRepo.save(localBrewing);
            return this.brewingRepo.update(remoteBrewing);
          });
          const syncRemotes = remoteBrewings
            .filter(remoteBrewing => {
              return !localBrewings.find(
                local => local.getId() === remoteBrewing.getId()
              );
            })
            .map(remoteBrewing => this.brewingRepo.save(remoteBrewing));

          return forkJoin([...syncLocals, ...syncRemotes]);
        })
      )
      .subscribe(() => this.appState.setSyncing(false));
  }
}

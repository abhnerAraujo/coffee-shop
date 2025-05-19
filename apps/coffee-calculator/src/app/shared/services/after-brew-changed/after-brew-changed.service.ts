import { inject, Injectable } from '@angular/core';
import { Brewing } from '@domain/brewing';
import { DomainEvent, EventDispatcher } from '@domain/general/event-dispatcher';
import { BrewSyncService } from '@shared/services/brew-sync.service';
import { concatMap, delay, of, Subject } from 'rxjs';
import { BREWING_REPOSITORY } from '../../../features/brewing/infra';
import { BrewStateService } from '../brew-state.service';

@Injectable({
  providedIn: 'root',
})
export class AfterBrewChangedService {
  private brewingRepo = inject(BREWING_REPOSITORY);
  private brewSync = inject(BrewSyncService);
  private brewState = inject(BrewStateService);
  private brewQueue = new Subject<{
    event: DomainEvent<Brewing>,
    handler: (event: DomainEvent<Brewing>) => void;
  }>();
  constructor() {
    console.log('[AfterBrewChangedService]', 'init');
    EventDispatcher.listen<Brewing>(Brewing.CREATE, (event) =>
      this.brewQueue.next({
        event,
        handler: this.handleCreateBrewing.bind(this),
      })
    );
    EventDispatcher.listen<Brewing>(Brewing.UPDATE, (event) =>
      this.brewQueue.next({
        event,
        handler: this.handleUpdateBrewing.bind(this),
      })
    );
    this.brewQueue
      .pipe(concatMap(({ event, handler }) => of(handler(event)).pipe(delay(1000))))
      .subscribe({
        next: () => console.log('Executed'),
        error: (error) => console.error(error),
        complete: () => console.log('Completed'),
      });
  }

  private async handleCreateBrewing(event: DomainEvent<Brewing>) {
    console.log('[AfterBrewChangedService]', 'brewing created');
    await this.brewingRepo.save(event.payload);
    this.brewState.setBrewing(event.payload);
    this.brewSync.sync();
  }

  private async handleUpdateBrewing(event: DomainEvent<Brewing>) {
    console.log('[AfterBrewChangedService]', 'brewing updated');
    await this.brewingRepo.update(event.payload);
    this.brewState.setBrewing(event.payload);
    this.brewSync.sync();
  }
}

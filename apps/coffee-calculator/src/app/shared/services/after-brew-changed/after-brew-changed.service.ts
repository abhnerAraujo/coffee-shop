import { inject, Injectable } from '@angular/core';
import { Brewing } from '@domain/brewing';
import { DomainEvent, EventDispatcher } from '@domain/general/event-dispatcher';
import { BrewSyncService } from '@shared/services/brew-sync.service';
import { BREWING_REPOSITORY } from '../../../features/brewing/infra';

@Injectable({
  providedIn: 'root',
})
export class AfterBrewChangedService {
  private brewingRepo = inject(BREWING_REPOSITORY);
  private brewSync = inject(BrewSyncService);
  constructor() {
    console.log('[AfterBrewChangedService]', 'init');
    EventDispatcher.listen(Brewing.CREATE, this.handleBrewingEvents.bind(this));
    EventDispatcher.listen(Brewing.UPDATE, this.handleBrewingEvents.bind(this));
  }

  private async handleBrewingEvents(event: DomainEvent<Brewing>) {
    console.log('[AfterBrewChangedService]', 'brewing updated');
    if (await this.brewingRepo.getBrewing(event.payload.getId()))
      await this.brewingRepo.update(event.payload);
    else await this.brewingRepo.save(event.payload);
    this.brewSync.sync();
  }
}

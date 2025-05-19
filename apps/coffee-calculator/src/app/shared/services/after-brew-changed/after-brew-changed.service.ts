import { inject, Injectable } from '@angular/core';
import { Brewing } from '@domain/brewing';
import { DomainEvent, EventDispatcher } from '@domain/general/event-dispatcher';
import { BrewSyncService } from '@shared/services/brew-sync.service';
import { BREWING_REPOSITORY } from '../../../features/brewing/infra';
import { BrewStateService } from '../brew-state.service';

@Injectable({
  providedIn: 'root',
})
export class AfterBrewChangedService {
  private brewingRepo = inject(BREWING_REPOSITORY);
  private brewSync = inject(BrewSyncService);
  private brewState = inject(BrewStateService);
  constructor() {
    console.log('[AfterBrewChangedService]', 'init');
    EventDispatcher.listen(Brewing.CREATE, this.handleCreateBrewing.bind(this));
    EventDispatcher.listen(Brewing.UPDATE, this.handleUpdateBrewing.bind(this));
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

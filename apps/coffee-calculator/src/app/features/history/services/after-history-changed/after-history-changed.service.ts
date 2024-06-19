import { EventEmitter, Injectable } from '@angular/core';
import { EventDispatcher } from '@domain/general/event-dispatcher';

@Injectable({
  providedIn: 'root',
})
export class AfterHistoryChangedService {
  private historyUpdated = new EventEmitter<void>();
  constructor() {
    EventDispatcher.listen(
      'MethodProcess',
      this.handleMethodProcess.bind(this)
    );
  }

  private handleMethodProcess() {
    this.historyUpdated.emit();
  }

  get historyUpdated$() {
    return this.historyUpdated.asObservable();
  }
}

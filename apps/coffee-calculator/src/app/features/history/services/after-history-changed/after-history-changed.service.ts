import { EventEmitter, Injectable } from '@angular/core';
import { EventDispatcher } from '@domain/general/event-dispatcher';
import { MethodProcess } from '@domain/method-process';

@Injectable({
  providedIn: 'root',
})
export class AfterHistoryChangedService {
  private historyUpdated = new EventEmitter<void>();
  constructor() {
    EventDispatcher.listen(
      MethodProcess.CREATE,
      this.handleMethodProcess.bind(this)
    );
  }

  private handleMethodProcess() {
    console.log('[AfterHistoryChangedService]', 'history updated');
    this.historyUpdated.emit();
  }

  get historyUpdated$() {
    return this.historyUpdated.asObservable();
  }
}

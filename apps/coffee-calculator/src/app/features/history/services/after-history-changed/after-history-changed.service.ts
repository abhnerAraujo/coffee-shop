import { isPlatformServer } from '@angular/common';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EventDispatcher } from '@domain/general/event-dispatcher';
import { MethodProcess } from '@domain/method-process';

@Injectable({
  providedIn: 'root',
})
export class AfterHistoryChangedService {
  private historyUpdated = new EventEmitter<void>();
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformServer(platformId)) return;
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

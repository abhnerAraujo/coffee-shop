import { Injectable } from '@angular/core';
import { DraftMethodProcess, MethodProcess } from '@domain/method-process';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrewStateService {
  private readonly process = new BehaviorSubject<MethodProcess | undefined>(
    undefined
  );
  readonly process$ = this.process.asObservable();
  private readonly draft = new BehaviorSubject<DraftMethodProcess | undefined>(
    undefined
  );
  readonly draft$ = this.draft.asObservable();
  readonly timer = new BehaviorSubject<{
    time: number;
    status: 'paused' | 'counting' | 'stopped';
  }>({ time: 0, status: 'stopped' });
  readonly timer$ = this.timer.asObservable();
  private readonly stopTimer$ = new Subject<void>();
  constructor() {
    console.log('BrewStateService created');
  }

  startTimer() {
    if (this.timer.value.status === 'stopped') {
      this.timer.next({ time: 0, status: 'counting' });
      interval(1000)
        .pipe(takeUntil(this.stopTimer$))
        .subscribe(() => {
          const { time, status } = this.timer.value;

          if (status === 'counting') {
            this.timer.next({ time: time + 1, status });
          }
        });
    } else {
      this.timer.next({ ...this.timer.value, status: 'counting' });
    }
  }

  pauseTimer() {
    this.timer.next({ ...this.timer.value, status: 'paused' });
  }

  stopTimer() {
    this.timer.next({ time: 0, status: 'stopped' });
    this.stopTimer$.next();
  }

  setProcess(process: MethodProcess | undefined) {
    this.process.next(process);
  }

  getProcess() {
    return this.process.value;
  }

  getDraft() {
    return this.draft.value;
  }

  setDraft(draft: DraftMethodProcess | undefined) {
    this.draft.next(draft);
  }
}

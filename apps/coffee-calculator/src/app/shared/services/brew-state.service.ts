import { Injectable } from '@angular/core';
import { Brewing } from '@domain/brewing';
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
    hidden: boolean;
    fullscreen: boolean;
  }>({ time: 0, status: 'stopped', hidden: true, fullscreen: false });
  readonly timer$ = this.timer.asObservable();
  private readonly stopTimer$ = new Subject<void>();
  private brewing = new BehaviorSubject<Brewing | undefined>(undefined);
  readonly brewing$ = this.brewing.asObservable();
  private editing = new BehaviorSubject(false);
  readonly editing$ = this.editing.asObservable();

  startTimer() {
    if (this.timer.value.status === 'stopped') {
      this.timer.next({ ...this.timer.value, time: 0, status: 'counting' });
      interval(1000)
        .pipe(takeUntil(this.stopTimer$))
        .subscribe(() => {
          const { time, status } = this.timer.value;

          if (status === 'counting') {
            this.timer.next({ ...this.timer.value, time: time + 1, status });
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
    this.timer.next({ ...this.timer.value, time: 0, status: 'stopped' });
    this.stopTimer$.next();
  }

  toggleFullscreen() {
    this.timer.next({ ...this.timer.value, fullscreen: !this.timer.value.fullscreen });
  }

  toggleTimerVisibility() {
    this.timer.next({ ...this.timer.value, hidden: !this.timer.value.hidden });
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

  setBrewing(brewing: Brewing | undefined) {
    this.brewing.next(brewing);
  }

  getBrewing() {
    return this.brewing.value;
  }

  setEditing(editing: boolean) {
    this.editing.next(editing);
  }

  isEditing() {
    return this.editing.value;
  }
}

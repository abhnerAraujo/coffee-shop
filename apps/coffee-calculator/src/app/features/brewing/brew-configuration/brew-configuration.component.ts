import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Brewing } from '@domain/brewing';
import { MethodType } from '@domain/method';
import { BrewStateService } from '@shared/services/brew-state.service';
import { BrewService } from '@shared/services/brew.service';

@Component({
  selector: 'app-brew-configuration',
  templateUrl: './brew-configuration.component.html',
  styleUrl: './brew-configuration.component.scss',
})
export class BrewConfigurationComponent implements OnInit {
  protected method = signal<MethodType>('French Press');
  protected quantities = signal<{ water: string; coffee: string }>({
    water: '180',
    coffee: '11.25',
  });
  protected units = signal<{ water: string; coffee: string }>({
    water: 'ml',
    coffee: 'g',
  });
  protected cups = signal<{ amount: number; unit: string; volume: number }>({
    amount: 1,
    unit: 'ml',
    volume: 180,
  });
  protected time = signal(240);
  protected timeEdit = signal(false);
  protected grindSize = signal<string>('medium');
  protected timerStatus = signal<'paused' | 'counting' | 'stopped'>('stopped');
  protected timer = signal<string>('0:00');
  protected showTimer = signal(false);
  protected isEditing = signal(false);

  constructor(
    protected brewState: BrewStateService,
    private destroyRef: DestroyRef,
    private brewService: BrewService
  ) {
    brewState.timer$.subscribe(({ time, status, hidden }) => {
      this.timer.set(this.displayTime(time));
      this.timerStatus.set(status);
      this.showTimer.set(!hidden);
    });
    brewState.editing$.pipe(takeUntilDestroyed()).subscribe(editing => {
      this.isEditing.set(editing);
      this.timeEdit.set(false);
    });
  }

  ngOnInit() {
    this.brewState.brewing$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(brewing => this.updateBrewing(brewing));
  }

  private updateBrewing(brewing: Brewing | undefined) {
    if (brewing) {
      const methodProcess = brewing.getMethodProcess();
      const { quantities, units, cups } = methodProcess;

      this.time.set(brewing.getTimer());
      this.method.set(brewing.getMethodProcess().method);
      this.quantities.set({
        water: quantities.water.toFixed(2),
        coffee: quantities.coffee.toFixed(2),
      });
      this.units.set(units);
      this.grindSize.set(methodProcess.grindSize);
      this.cups.set(cups);
    } else {
      this.time.set(240);
    }
  }

  protected displayTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  protected updateTime(time: string) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setTimer(Number(time));
      this.brewService.updateBrewing(brewing);
      this.brewState.setBrewing(brewing);
      this.timeEdit.set(false);
    }
  }
}

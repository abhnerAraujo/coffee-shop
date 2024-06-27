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
  protected time = signal<string>(this.displayTime(4 * 60));
  protected timerStatus = signal<'paused' | 'counting' | 'stopped'>('stopped');
  protected timer = signal<string>('0:00');

  constructor(
    protected brewState: BrewStateService,
    private brewService: BrewService,
    private destroyRef: DestroyRef
  ) {
    // brewService.process$
    //   .pipe(
    //     takeUntilDestroyed(destroyRef),
    //     distinctUntilChanged((prev, next) => prev?.id === next?.id)
    //   )
    //   .subscribe(currentProcess => {
    //     console.log(currentProcess);
    //     if (currentProcess) {
    //       this.quantities.set({
    //         water: currentProcess.quantities.water.toFixed(2),
    //         coffee: currentProcess.quantities.coffee.toFixed(2),
    //       });
    //       this.units.set({
    //         water: currentProcess.units.water,
    //         coffee: currentProcess.units.coffee,
    //       });
    //       this.method.set(currentProcess.method);
    //       this.time.set(this.displayTime(currentProcess.time));
    //     } else {
    //       this.quantities.set({ water: '180', coffee: '11.25' });
    //       this.units.set({ water: 'ml', coffee: 'g' });
    //       this.method.set('French Press');
    //       this.time.set(this.displayTime(4 * 60));
    //     }
    //   });
    brewState.timer$.subscribe(({ time, status }) => {
      this.timer.set(this.displayTime(time));
      this.timerStatus.set(status);
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
      const { quantities, units } = methodProcess;

      this.time.set(this.displayTime(brewing.getTimer()));
      this.method.set(brewing.getMethodProcess().method);
      this.quantities.set({
        water: quantities.water.toFixed(2),
        coffee: quantities.coffee.toFixed(2),
      });
      this.units.set(units);
    } else {
      this.time.set(this.displayTime(4 * 60));
    }
  }

  protected displayTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

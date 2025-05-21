import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Brewing } from '@domain/brewing';
import { MethodType } from '@domain/method';
import { BrewStateService } from '@shared/services/brew-state.service';

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
  
  protected isEditing = signal(false);
  protected properties = signal<Array<{ name: string; value: string }>>([]);
  protected isMediumLayout = signal(false);

  constructor(
    protected brewState: BrewStateService,
    private destroyRef: DestroyRef,
    private layoutChanges: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    brewState.editing$.pipe(takeUntilDestroyed()).subscribe(editing => {
      this.isEditing.set(editing);
      this.timeEdit.set(false);
    });
    if (isPlatformBrowser(platformId)) {
      const mediumBreakpoint = '(min-width: 768px)';

      this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
        console.log(result.matches);
        this.isMediumLayout.set(result.matches);
      });
    }
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
      this.properties.set(brewing.getProperties());
    } else {
      this.time.set(240);
    }
  }

  protected removeProperty(index: number) {
    this.properties.update(properties => properties.filter((_, i) => i !== index));
  }

  protected updateTime(time: string) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setTimer(Number(time));
      this.timeEdit.set(false);
    }
  }

  protected addProperty() {
    this.properties.update(properties => [
      ...properties,
      { name: '', value: '' },
    ]);
  }

  protected moveProperty(index: number, direction: number) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.moveProperty(index, direction);
    }
  }

  protected updateProperties() {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setProperties(this.properties())
    }
  }
}

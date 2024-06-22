import { DestroyRef, Inject, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MethodType, MethodTypes } from '@domain/method';
import { MethodProcess } from '@domain/method-process';
import { RatioIntensities, RatioIntensity, ratioOptions } from '@domain/ratio';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { CUP_SIZE, unitOptions } from '@domain/unit';
import { BrewStateService } from '@shared/services/brew-state.service';
import { Observable } from 'rxjs';
import { HistoryRepository } from '../../history/domain';
import { HISTORY_REPOSITORY } from '../../history/infra';
import { CoffeCalculatorValue } from '../domain';
import { CoffeeCalculator } from '../domain/coffee-calculator';
import CoffeeCalculatorView from '../domain/coffee-calculator-view';

@Injectable()
export class ProcessPresenterService {
  private _component?: CoffeeCalculatorView;
  private analytics = inject(Analytics);
  private isBrowser = false;

  constructor(
    @Inject(HISTORY_REPOSITORY) private historyRepo: HistoryRepository,
    private brewService: BrewStateService
  ) {}

  init(component: CoffeeCalculatorView, isBrowser: boolean) {
    this.isBrowser = isBrowser;
    this._component = component;
    this._component.setUnitOptions(unitOptions);
    this._component.setRatioOptions([...RatioIntensities]);
    this._component.setMethodOptions([...MethodTypes]);
    const defaultRatio = ratioOptions['French Press']['medium'];

    this.handleFormChanges(component.formChanges, component.destroyRef);
    this._component.setFormValue({
      ratio: defaultRatio,
    });
  }

  private handleFormChanges(
    observable: Observable<CoffeCalculatorValue>,
    destroyRef: DestroyRef
  ) {
    const calculator = new CoffeeCalculator();

    observable.pipe(takeUntilDestroyed(destroyRef)).subscribe(value => {
      const { ratio, method, coffeeCups } = value;

      calculator.setRatio(ratio);
      calculator.setUnits({
        coffee: value.coffeeUnit,
        water: value.waterUnit,
      });
      calculator.setCups(coffeeCups);
      const { water, coffee } = calculator.calculate();
      const cups = `${value.coffeeCups} ${
        coffeeCups > 1 ? 'cups' : 'cup'
      } of ${ratioIntensityByMethod(ratio, method)} coffee`;

      this.saveProcessDraft(value, {
        water,
        coffee,
      });
      this.brewService.setProcess(undefined);
      if (this.isBrowser)
        this.logCalculation({ method, water, coffee, coffeeCups });
      this._component?.setResult({
        water: water.toFixed(2),
        coffee: coffee.toFixed(2),
        cups,
      });
    });
  }

  private saveProcessDraft(
    process: CoffeCalculatorValue,
    result: { water: number; coffee: number }
  ) {
    this.historyRepo.saveDraft(
      MethodProcess.builder()
        .withMethod(process.method)
        .withCups({
          amount: process.coffeeCups,
          volume: CUP_SIZE,
          unit: process.waterUnit,
        })
        .withRatio(process.ratio)
        .withUnits({
          coffee: process.coffeeUnit,
          water: process.waterUnit,
        })
        .withQuantities({
          water: result.water,
          coffee: result.coffee,
        })
        .draft()
    );
  }

  setIntensityRatio(method: MethodType, intensity: RatioIntensity) {
    this._component?.setFormValue({
      ratio: ratioOptions[method][intensity],
    });
  }

  private logCalculation({
    method,
    water,
    coffee,
    coffeeCups,
  }: {
    method: MethodType;
    water: number;
    coffee: number;
    coffeeCups: number;
  }) {
    const event = `new_calculation_${method}`;
    console.log(event);
    logEvent(this.analytics, event, { water, coffee, method, coffeeCups });
  }
}

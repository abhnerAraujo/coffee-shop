import { Inject, Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MethodType, MethodTypes } from '@domain/method';
import { MethodProcess } from '@domain/method-process';
import { RatioIntensities, RatioIntensity, ratioOptions } from '@domain/ratio';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { CUP_SIZE, unitOptions } from '@domain/unit';
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
    @Inject(HISTORY_REPOSITORY) private historyRepo: HistoryRepository
  ) {}

  init(component: CoffeeCalculatorView, isBrowser: boolean) {
    this.isBrowser = isBrowser;
    this._component = component;
    this._component.setUnitOptions(unitOptions);
    this._component.setRatioOptions([...RatioIntensities]);
    this._component.setMethodOptions([...MethodTypes]);
    const defaultRatio = ratioOptions['French Press']['medium'];

    this.handleFormChanges(component.formChanges);
    this._component.setFormValue({
      ratio: defaultRatio,
    });
  }

  private handleFormChanges(observable: Observable<CoffeCalculatorValue>) {
    const calculator = new CoffeeCalculator();

    observable.subscribe(value => {
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
        .setMethod(process.method)
        .setCups({
          amount: process.coffeeCups,
          volume: CUP_SIZE,
          unit: process.waterUnit,
        })
        .setRatio(process.ratio)
        .setUnits({
          coffee: process.coffeeUnit,
          water: process.waterUnit,
        })
        .setQuantities({
          water: result.water,
          coffee: result.coffee,
        })
        .build()
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

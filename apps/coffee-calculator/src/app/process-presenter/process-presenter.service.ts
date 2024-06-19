import { Inject, Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { CoffeeCalculator } from '@domain/coffee-calculator';
import CoffeeCalculatorView, {
  CoffeCalculatorValue,
} from '@domain/coffee-calculator-view';
import { MethodType, MethodTypes } from '@domain/method';
import { MethodProcess } from '@domain/method-process';
import { RatioIntensities, RatioIntensity, ratioOptions } from '@domain/ratio';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { CUP_SIZE, unitOptions } from '@domain/unit';
import { Observable } from 'rxjs';
import { HistoryRepository } from '../features/history/domain';
import { HISTORY_REPOSITORY } from '../features/history/infra';

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

      if (this.isBrowser)
        this.logCalculation({ method, water, coffee, coffeeCups });
      this._component?.setResult({
        water: water.toFixed(2),
        coffee: coffee.toFixed(2),
        cups,
      });
    });
  }

  saveInHistory(
    process: CoffeCalculatorValue,
    result: { water: string; coffee: string }
  ) {
    this.historyRepo.saveProcess(
      MethodProcess.builder()
        .setCups({
          amount: process.coffeeCups,
          volume: CUP_SIZE,
          unit: process.waterUnit,
        })
        .setMethod(process.method)
        .setRatio(process.ratio)
        .setUnits({
          coffee: process.coffeeUnit,
          water: process.waterUnit,
        })
        .setQuantities({
          water: Number(result.water),
          coffee: Number(result.coffee),
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

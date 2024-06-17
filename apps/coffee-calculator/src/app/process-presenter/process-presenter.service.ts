import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { CoffeeCalculator } from '@domain/coffee-calculator';
import CoffeeCalculatorView, {
  CoffeCalculatorValue,
} from '@domain/coffee-calculator-view';
import { MethodType, MethodTypes } from '@domain/method';
import { RatioIntensities, RatioIntensity, ratioOptions } from '@domain/ratio';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { unitOptions } from '@domain/unit';
import { Observable } from 'rxjs';

@Injectable()
export class ProcessPresenterService {
  private _component?: CoffeeCalculatorView;
  private analytics = inject(Analytics);
  private isBrowser = false;

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
    observable.subscribe((value) => {
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
    const event = `${method} - ${coffeeCups} cups`;
    logEvent(this.analytics, event, { water, coffee, method, coffeeCups });
  }
}

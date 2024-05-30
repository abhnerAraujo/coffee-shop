import { Injectable } from '@angular/core';
import CoffeeCalculatorView from '@domain/coffee-calculator-view';

@Injectable({
  providedIn: 'root',
})
export class ProcessPresenterService {
  private _component?: CoffeeCalculatorView;

  init(component: CoffeeCalculatorView) {
    this._component = component;

    this._component.setUnitOptions({
      coffee: [
        { name: 'Grams', measure: 'g' },
        { name: 'Flui Ounces', measure: 'fl.oz' },
        { name: 'Tablespoons', measure: 'tbsp' },
        { name: 'Teaspoons', measure: 'tsp' },
        { name: 'Cups', measure: 'cup' },
      ],
      water: [
        { name: 'Grams', measure: 'g' },
        { name: 'Milliliters', measure: 'ml' },
        { name: 'Liters', measure: 'l' },
        { name: 'Ounces', measure: 'oz' },
        { name: 'Cups', measure: 'cup' },
      ],
    });
  }
}

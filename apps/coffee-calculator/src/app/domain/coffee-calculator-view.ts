import { Observable } from 'rxjs';
import { MethodType } from './method';
import { RatioIntensity } from './ratio';
import { Unit, UnitOptions } from './unit';

export default interface CoffeeCalculatorView {
  setUnitOptions(options: UnitOptions): void;
  setMethodOptions(options: MethodType[]): void;
  setRatioOptions(options: RatioIntensity[]): void;
  setFormValue(value: Partial<CoffeCalculatorValue>): void;
  setResult(value: { water: string; coffee: string; cups: string }): void;
  formChanges: Observable<CoffeCalculatorValue>;
}

export type CoffeCalculatorValue = {
  coffeeAmount: number;
  coffeeUnit: Unit;
  waterAmount: number;
  waterUnit: Unit;
  method: MethodType;
  coffeeCups: number;
  ratio: {
    coffee: number;
    water: number;
  };
};

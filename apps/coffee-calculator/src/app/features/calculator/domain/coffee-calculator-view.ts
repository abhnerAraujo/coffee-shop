import { Observable } from 'rxjs';
import { MethodType } from '../../../domain/method';
import { RatioIntensity } from '../../../domain/ratio';
import { Unit, UnitOptions } from '../../../domain/unit';

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

import { MethodType, methodWaterAmount } from '@domain/method';
import { RatioOption } from '../../../domain/ratio';
import { BASE_UNIT, Unit } from '../../../domain/unit';
import { convertUnit } from '../../../domain/unit-converter';

export class CoffeeCalculator {
  private ratio: RatioOption = { coffee: 0, water: 0 };
  private units: { water: Unit; coffee: Unit } = {
    water: BASE_UNIT,
    coffee: BASE_UNIT,
  };
  private cups = 0;
  private method = 'French Press' as MethodType;
  private cupSize: number = methodWaterAmount['French Press'];

  setRatio(ratio: RatioOption) {
    this.ratio = ratio;
  }

  setUnits(units: { water: Unit; coffee: Unit }) {
    this.units = units;
  }

  setCups(cups: number) {
    this.cups = cups;
  }

  setCupSize(cupSize: number) {
    this.cupSize = cupSize;
  }

  setMethod(method: MethodType) {
    this.method = method;
  }

  calculate() {
    const coffee = this.calculateCoffee(
      this.ratio.coffee,
      this.ratio.water,
      this.cupSize * this.cups
    );
    const water =
      this.cups *
      convertUnit(this.cupSize, BASE_UNIT, this.units.water);

    return {
      water,
      coffee: convertUnit(coffee, BASE_UNIT, this.units.coffee),
    };
  }

  private calculateCoffee(
    coffeeRatio: number,
    waterRatio: number,
    waterAmount: number
  ) {
    return (coffeeRatio * waterAmount) / waterRatio;
  }
}

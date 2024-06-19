import { RatioOption } from '../../../domain/ratio';
import { BASE_UNIT, CUP_SIZE, Unit } from '../../../domain/unit';
import { convertUnit } from '../../../domain/unit-converter';

export class CoffeeCalculator {
  private ratio: RatioOption = { coffee: 0, water: 0 };
  private units: { water: Unit; coffee: Unit } = {
    water: BASE_UNIT,
    coffee: BASE_UNIT,
  };
  private cups = 0;

  setRatio(ratio: RatioOption) {
    this.ratio = ratio;
  }

  setUnits(units: { water: Unit; coffee: Unit }) {
    this.units = units;
  }

  setCups(cups: number) {
    this.cups = cups;
  }

  calculate() {
    const water =
      this.cups * convertUnit(CUP_SIZE, BASE_UNIT, this.units.water);
    const coffee = this.calculateCoffee(
      this.ratio.coffee,
      this.ratio.water,
      water
    );

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

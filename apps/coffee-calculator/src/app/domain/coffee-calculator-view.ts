export default interface CoffeeCalculatorView {
  setUnitOptions(options: UnitOptions): void;
  setMethodOptions(): void;
  setRatioOptions(): void;
  setCupSizeOptions(): void;
  setCupAmountOptions(): void;
}

export type UnitOptions = {
  coffee: { name: string; measure: Unit }[];
  water: { name: string; measure: Unit }[];
};

type Unit = 'g' | 'oz' | 'ml' | 'cup' | 'tbsp' | 'tsp' | 'fl.oz' | 'l';

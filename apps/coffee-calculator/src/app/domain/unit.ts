export type UnitOptions = {
  coffee: { name: string; unit: Unit }[];
  water: { name: string; unit: Unit }[];
};

export const unitOptions: UnitOptions = {
  coffee: [
    { name: 'Grams', unit: 'g' },
    { name: 'Flui Ounces', unit: 'fl.oz' },
    { name: 'Tablespoons', unit: 'tbsp' },
    { name: 'Teaspoons', unit: 'tsp' },
    { name: 'Cups', unit: 'cup' },
  ],
  water: [
    { name: 'Grams', unit: 'g' },
    { name: 'Milliliters', unit: 'ml' },
    { name: 'Liters', unit: 'l' },
    { name: 'Ounces', unit: 'oz' },
    { name: 'Cups', unit: 'cup' },
  ],
};

export type Unit = 'g' | 'oz' | 'ml' | 'cup' | 'tbsp' | 'tsp' | 'fl.oz' | 'l';

export const CUP_SIZE = 180;
export const BASE_UNIT = 'g';

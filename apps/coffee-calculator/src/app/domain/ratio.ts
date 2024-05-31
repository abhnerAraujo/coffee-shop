import { MethodType } from './method';

export const RatioIntensities = ['mild', 'medium', 'strong', 'custom'] as const;

export type RatioIntensity = (typeof RatioIntensities)[number];

export interface RatioOption {
  coffee: number;
  water: number;
}

export const ratioOptions: MethodRatios = {
  AeroPress: {
    mild: { coffee: 1, water: 18 },
    medium: { coffee: 1, water: 15 },
    strong: { coffee: 1, water: 10 },
    custom: { coffee: 0, water: 0 },
  },
  Chemex: {
    mild: { coffee: 1, water: 18 },
    medium: { coffee: 1, water: 15 },
    strong: { coffee: 1, water: 10 },
    custom: { coffee: 0, water: 0 },
  },
  'French Press': {
    mild: { coffee: 1, water: 18 },
    medium: { coffee: 1, water: 15 },
    strong: { coffee: 1, water: 10 },
    custom: { coffee: 0, water: 0 },
  },
  V60: {
    mild: { coffee: 1, water: 18 },
    medium: { coffee: 1, water: 15 },
    strong: { coffee: 1, water: 10 },
    custom: { coffee: 0, water: 0 },
  },
  'Moka Pot': {
    mild: { coffee: 1, water: 18 },
    medium: { coffee: 1, water: 15 },
    strong: { coffee: 1, water: 10 },
    custom: { coffee: 0, water: 0 },
  },
};

type MethodRatios = {
  [key in MethodType]: { [key in RatioIntensity]: RatioOption };
};

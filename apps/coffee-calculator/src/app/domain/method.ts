export const MethodTypes = [
  'AeroPress',
  'Chemex',
  'French Press',
  'V60',
  'Moka Pot',
] as const;
export type MethodType = (typeof MethodTypes)[number];

/**
 * Amount of water for one cup
 */
export const methodWaterAmount = {
  AeroPress: 220,
  Chemex: 300,
  'French Press': 180,
  V60: 180,
  'Moka Pot': 60,
} as const;

export const methodTime = {
  AeroPress: 60,
  Chemex: 240,
  'French Press': 240,
  V60: 240,
  'Moka Pot': 0,
} as const;

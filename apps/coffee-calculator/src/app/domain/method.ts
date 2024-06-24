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
  'French Press': 200,
  V60: 200,
  'Moka Pot': 60,
} as const;

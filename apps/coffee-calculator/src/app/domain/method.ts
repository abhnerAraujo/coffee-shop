export const MethodTypes = [
  'AeroPress',
  'Chemex',
  'French Press',
  'V60',
  'Moka Pot',
] as const;
export type MethodType = (typeof MethodTypes)[number];

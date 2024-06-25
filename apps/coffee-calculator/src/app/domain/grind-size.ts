const grindSizes = [
  'extra-fine',
  'fine',
  'medium-fine',
  'medium',
  'medium-coarse',
  'coarse',
] as const;

export type GrindSize = (typeof grindSizes)[number];

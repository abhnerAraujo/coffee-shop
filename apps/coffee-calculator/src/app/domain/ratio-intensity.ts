import { MethodType } from './method';
import { RatioOption, ratioOptions } from './ratio';

export function ratioIntensityByMethod(ratio: RatioOption, method: MethodType) {
  const baseRatio = ratioOptions[method];
  const coffeeWaterRatio = ratio.coffee / ratio.water;
  const mildRegularThreshold =
    baseRatio.medium.coffee /
    (baseRatio.medium.water +
      (baseRatio.mild.water - baseRatio.medium.water) / 2);
  const regularStrongThreshold =
    baseRatio.medium.coffee /
    (baseRatio.medium.water -
      (baseRatio.medium.water - baseRatio.strong.water) / 2);

  if (coffeeWaterRatio < mildRegularThreshold) {
    return 'mild';
  }
  if (coffeeWaterRatio > regularStrongThreshold) {
    return 'strong';
  }
  return 'regular';
}

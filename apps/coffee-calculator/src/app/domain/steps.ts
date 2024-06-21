import { MethodProcess } from './method-process';

export function stepsByMethodProcess(methodProcess: MethodProcess) {
  switch (methodProcess.method) {
    case 'French Press':
      return frenchPressSteps();
    case 'AeroPress':
      return aeropressSteps();
    case 'Chemex':
      return chemexSteps();
    case 'V60':
      return v60Steps();
    case 'Moka Pot':
      return mokaPotSteps();
    default:
      return [];
  }
}

function frenchPressSteps() {
  return [
    [
      'Pour hot water into the French press to preheat it. This helps maintain the brewing temperature. Discard the water before adding the coffee grounds.',
    ],
    [
      'Use a burr grinder to grind the coffee beans to a coarse consistency, similar to sea salt. This prevents over-extraction and makes for easier pressing.',
      `Heat water to about 200°F (93°C). If you don't have a thermometer, bring the water to a boil and then let it sit for 30 seconds to cool slightly.`,
      'Place the coarse coffee grounds into the preheated French press.',
      'Start a timer for 4 minutes. Pour hot water over the coffee grounds, filling the French press halfway. Stir gently to ensure all grounds are saturated.',
      'After stirring, pour in the remaining water, filling the French press to the top.',
      'Place the lid on the French press with the plunger pulled all the way up to retain heat.',
      'Allow the coffee to steep for 4 minutes. If you prefer a stronger brew, you can steep for up to 5 minutes.',
      'After the brewing time is complete, slowly press the plunger down. Apply steady pressure to ensure the grounds are pushed to the bottom without too much force.',
      'Pour the freshly brewed coffee into your mug immediately to prevent over-extraction.',
      'Try it black first to taste the full flavor profile. If you prefer, add cream or sugar to taste.',
    ],
  ];
}

function aeropressSteps() {
  return [
    [
      'Pour hot water into the French press to preheat it. This helps maintain the brewing temperature. Discard the water before adding the coffee grounds.',
    ],
    [
      'Use a burr grinder to grind the coffee beans to a coarse consistency, similar to sea salt. This prevents over-extraction and makes for easier pressing.',
      `Heat water to about 200°F (93°C). If you don't have a thermometer, bring the water to a boil and then let it sit for 30 seconds to cool slightly.`,
      'Place the coarse coffee grounds into the preheated French press.',
      'Start a timer for 4 minutes. Pour hot water over the coffee grounds, filling the French press halfway. Stir gently to ensure all grounds are saturated.',
      'After stirring, pour in the remaining water, filling the French press to the top.',
      'Place the lid on the French press with the plunger pulled all the way up to retain heat.',
      'Allow the coffee to steep for 4 minutes. If you prefer a stronger brew, you can steep for up to 5 minutes.',
      'After the brewing time is complete, slowly press the plunger down. Apply steady pressure to ensure the grounds are pushed to the bottom without too much force.',
      'Pour the freshly brewed coffee into your mug immediately to prevent over-extraction.',
      'Try it black first to taste the full flavor profile. If you prefer, add cream or sugar to taste.',
    ],
  ];
}

function chemexSteps() {
  return [
    [
      'Pour hot water into the French press to preheat it. This helps maintain the brewing temperature. Discard the water before adding the coffee grounds.',
    ],
    [
      'Use a burr grinder to grind the coffee beans to a coarse consistency, similar to sea salt. This prevents over-extraction and makes for easier pressing.',
      `Heat water to about 200°F (93°C). If you don't have a thermometer, bring the water to a boil and then let it sit for 30 seconds to cool slightly.`,
      'Place the coarse coffee grounds into the preheated French press.',
      'Start a timer for 4 minutes. Pour hot water over the coffee grounds, filling the French press halfway. Stir gently to ensure all grounds are saturated.',
      'After stirring, pour in the remaining water, filling the French press to the top.',
      'Place the lid on the French press with the plunger pulled all the way up to retain heat.',
      'Allow the coffee to steep for 4 minutes. If you prefer a stronger brew, you can steep for up to 5 minutes.',
      'After the brewing time is complete, slowly press the plunger down. Apply steady pressure to ensure the grounds are pushed to the bottom without too much force.',
      'Pour the freshly brewed coffee into your mug immediately to prevent over-extraction.',
      'Try it black first to taste the full flavor profile. If you prefer, add cream or sugar to taste.',
    ],
  ];
}

function v60Steps() {
  return [
    [
      'Pour hot water into the French press to preheat it. This helps maintain the brewing temperature. Discard the water before adding the coffee grounds.',
    ],
    [
      'Use a burr grinder to grind the coffee beans to a coarse consistency, similar to sea salt. This prevents over-extraction and makes for easier pressing.',
      `Heat water to about 200°F (93°C). If you don't have a thermometer, bring the water to a boil and then let it sit for 30 seconds to cool slightly.`,
      'Place the coarse coffee grounds into the preheated French press.',
      'Start a timer for 4 minutes. Pour hot water over the coffee grounds, filling the French press halfway. Stir gently to ensure all grounds are saturated.',
      'After stirring, pour in the remaining water, filling the French press to the top.',
      'Place the lid on the French press with the plunger pulled all the way up to retain heat.',
      'Allow the coffee to steep for 4 minutes. If you prefer a stronger brew, you can steep for up to 5 minutes.',
      'After the brewing time is complete, slowly press the plunger down. Apply steady pressure to ensure the grounds are pushed to the bottom without too much force.',
      'Pour the freshly brewed coffee into your mug immediately to prevent over-extraction.',
      'Try it black first to taste the full flavor profile. If you prefer, add cream or sugar to taste.',
    ],
  ];
}

function mokaPotSteps() {
  return [
    [
      'Pour hot water into the French press to preheat it. This helps maintain the brewing temperature. Discard the water before adding the coffee grounds.',
    ],
    [
      'Use a burr grinder to grind the coffee beans to a coarse consistency, similar to sea salt. This prevents over-extraction and makes for easier pressing.',
      `Heat water to about 200°F (93°C). If you don't have a thermometer, bring the water to a boil and then let it sit for 30 seconds to cool slightly.`,
      'Place the coarse coffee grounds into the preheated French press.',
      'Start a timer for 4 minutes. Pour hot water over the coffee grounds, filling the French press halfway. Stir gently to ensure all grounds are saturated.',
      'After stirring, pour in the remaining water, filling the French press to the top.',
      'Place the lid on the French press with the plunger pulled all the way up to retain heat.',
      'Allow the coffee to steep for 4 minutes. If you prefer a stronger brew, you can steep for up to 5 minutes.',
      'After the brewing time is complete, slowly press the plunger down. Apply steady pressure to ensure the grounds are pushed to the bottom without too much force.',
      'Pour the freshly brewed coffee into your mug immediately to prevent over-extraction.',
      'Try it black first to taste the full flavor profile. If you prefer, add cream or sugar to taste.',
    ],
  ];
}

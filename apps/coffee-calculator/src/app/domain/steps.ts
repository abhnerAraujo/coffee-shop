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
    [
      `Coffee that is too weak: the grind may be too coarse, so try grinding a little more next time or letting the powder steep for longer.`,
      'Coffee that is too strong: instead of waiting four minutes for it to steep, try pouring the drink in just three.',
      'Bitter coffee: your beans may be too coarse, so try using a slightly coarser powder next time.',
      'Press the plunger gently',
      `Don't leave the coffee in the press for too long`,
    ],
  ];
}

function aeropressSteps() {
  return [
    [
      'Boil water and let it cool to about 200°F (93°C)',
      'Place a paper filter in the AeroPress cap and rinse it with hot water to remove the paper taste',
      'Assemble the AeroPress by attaching the cap to the brewing chamber',
      'Place the AeroPress on a sturdy cup or carafe',
      'Weigh and grind your coffee beans to a medium-fine consistency, using about 17 grams of coffee',
    ],
    [
      'Add the ground coffee to the AeroPress chamber',
      'Start your timer and pour hot water up to the number 4 mark (about 220 ml)',
      'Stir the coffee and water mixture for about 10 seconds to ensure all grounds are saturated',
      'Insert the plunger into the chamber to create a vacuum and prevent dripping',
      'Let the coffee steep for about 1 minute',
      'After steeping, gently press down the plunger with steady pressure, taking about 20-30 seconds to fully press',
      'Remove the AeroPress and discard the used coffee grounds and filter',
      'Stir the coffee in your cup to mix the flavors',
      'Enjoy your AeroPress coffee.',
    ],
    [],
  ];
}

function chemexSteps() {
  return [
    [
      'Place a Chemex paper filter in the top of the Chemex, ensuring the triple-folded side is against the spout',
      'Rinse the filter with hot water to remove the paper taste and preheat the Chemex, then discard the rinse water',
      'Boil water and let it cool to about 200°F (93°C)',
      'Weigh and grind your coffee beans to a medium-coarse consistency, using about 30 grams of coffee for 500 ml of water',
    ],
    [
      'Add the ground coffee to the rinsed filter and gently shake to level the coffee bed',
      'Start your timer and pour just enough hot water to saturate all the grounds (about 60-80 ml), allowing the coffee to bloom for 30-45 seconds',
      'After blooming, pour the remaining water in a slow, circular motion, keeping the water level consistent and avoiding the sides of the filter',
      'Continue pouring in stages, letting the water level drop slightly between pours, until you reach 500 ml of water',
      'The entire brewing process should take about 4-5 minutes',
      'Once brewing is complete, remove the filter and discard the used grounds',
      'Swirl the Chemex to mix the coffee',
      'Pour the coffee into your cup and enjoy.',
    ],
    [
      'Due to the thicker filter, it can sometimes clog. To resolve this, lift the filter with both hands to allow air to enter, then lower it back down. It should resume flowing normally.',
    ],
  ];
}

function v60Steps() {
  return [
    [
      'Place the V60 dripper on top of your coffee cup or carafe',
      'Insert a V60 paper filter into the dripper',
      'Rinse the paper filter with hot water to remove the paper taste and preheat the dripper, then discard the rinse water',
      'Boil water and let it cool to about 200°F (93°C)',
      'Weigh and grind your coffee beans to a medium-fine consistency, using about 15 grams of coffee for 250 ml of water',
    ],
    [
      'Add the ground coffee to the rinsed filter and gently shake to level the coffee bed',
      'Start your timer and pour just enough hot water to saturate all the grounds (about 30-50 ml), allowing the coffee to bloom for 30-45 seconds',
      'After blooming, pour the remaining water in a slow, circular motion, keeping the water level consistent and avoiding the sides of the filter',
      'Continue pouring until you reach 250 ml of water, aiming to finish pouring within 2-3 minutes.',
      'Let the coffee drip through completely, which should take about 3-4 minutes in total.',
      'Remove the dripper, discard the used filter and grounds.',
      'Stir the coffee in your cup or carafe to ensure an even flavor.',
      'Pour the coffee into your cup if you used a carafe, and enjoy.',
    ],
    [],
  ];
}

function mokaPotSteps() {
  return [
    [
      '(Optional) Put some water in the top chamber to avoid overheating the coffee which can cause a burnt taste',
    ],
    [
      'Fill the bottom chamber of the moka pot with water up to the safety valve',
      'Insert the filter basket into the bottom chamber',
      'Fill the filter basket with finely ground coffee, leveling it off without packing it down',
      'Screw the top chamber onto the bottom chamber tightly',
      'Place the moka pot on a stove over medium heat',
      'Wait for the water to boil and coffee to start filling the top chamber',
      'Listen for a hissing sound, indicating the brewing process is almost complete',
      'Remove the moka pot from the heat when the top chamber is full',
      'Stir the coffee in the top chamber to mix the layers',
      'Pour the coffee into your cup and enjoy',
    ],
    [
      'Completely fill the filter with ground coffee, but don’t pack it down',
      'Keep the heat low with a low flame.',
      'Remove the moka pot from heat just as the coffee starts to rise and bubble',
    ],
  ];
}

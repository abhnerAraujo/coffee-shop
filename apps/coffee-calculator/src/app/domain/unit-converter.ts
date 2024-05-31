import { Unit } from '@domain/unit';

export function convertUnit(amount: number, from: Unit, to: Unit): number {
  if (from === to) {
    return amount;
  }

  switch (from) {
    case 'g':
      return convertFromGrams(amount, to);
    case 'oz':
      return convertFromOunces(amount, to);
    case 'ml':
      return convertFromMilliliters(amount, to);
    case 'cup':
      return convertFromCups(amount, to);
    case 'tbsp':
      return convertFromTablespoons(amount, to);
    case 'tsp':
      return convertFromTeaspoons(amount, to);
    case 'fl.oz':
      return convertFromFluidOunces(amount, to);
    case 'l':
      return convertFromLiters(amount, to);
  }
}

function convertFromGrams(amount: number, to: Unit): number {
  switch (to) {
    case 'oz':
      return amount * 0.035274;
    case 'ml':
      return amount;
    case 'cup':
      return amount / 180;
    case 'tbsp':
      return amount / 5;
    case 'tsp':
      return amount / 5;
    case 'fl.oz':
      return amount / 29.5735;
    case 'l':
      return amount / 1000;
    default:
      return amount;
  }
}

function convertFromOunces(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 28.3495;
    case 'ml':
      return amount * 29.5735;
    case 'cup':
      return amount / 6.08;
    case 'tbsp':
      return amount * 1.917;
    case 'tsp':
      return amount * 5.764;
    case 'fl.oz':
      return amount;
    case 'l':
      return amount / 33.814;
    default:
      return amount;
  }
}

function convertFromMilliliters(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount;
    case 'oz':
      return amount / 29.5735;
    case 'cup':
      return amount / 240;
    case 'tbsp':
      return amount / 14.787;
    case 'tsp':
      return amount / 4.929;
    case 'fl.oz':
      return amount / 29.5735;
    case 'l':
      return amount / 1000;
    default:
      return amount;
  }
}

function convertFromCups(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 180;
    case 'oz':
      return amount * 6.08;
    case 'ml':
      return amount * 240;
    case 'tbsp':
      return amount * 16;
    case 'tsp':
      return amount * 48;
    case 'fl.oz':
      return amount * 8.115;
    case 'l':
      return amount / 4.227;
    default:
      return amount;
  }
}

function convertFromTablespoons(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 15;
    case 'oz':
      return amount / 1.917;
    case 'ml':
      return amount * 14.787;
    case 'cup':
      return amount / 16;
    case 'tsp':
      return amount * 3;
    case 'fl.oz':
      return amount / 1.917;
    case 'l':
      return amount / 67.628;
    default:
      return amount;
  }
}

function convertFromTeaspoons(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 5;
    case 'oz':
      return amount / 5.764;
    case 'ml':
      return amount * 4.929;
    case 'cup':
      return amount / 48;
    case 'tbsp':
      return amount / 3;
    case 'fl.oz':
      return amount / 5.764;
    case 'l':
      return amount / 202.884;
    default:
      return amount;
  }
}

function convertFromFluidOunces(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 29.5735;
    case 'oz':
      return amount;
    case 'ml':
      return amount * 29.5735;
    case 'cup':
      return amount / 8.115;
    case 'tbsp':
      return amount * 1.917;
    case 'tsp':
      return amount * 5.764;
    case 'l':
      return amount / 33.814;
    default:
      return amount;
  }
}

function convertFromLiters(amount: number, to: Unit): number {
  switch (to) {
    case 'g':
      return amount * 1000;
    case 'oz':
      return amount * 33.814;
    case 'ml':
      return amount * 1000;
    case 'cup':
      return amount * 4.227;
    case 'tbsp':
      return amount * 67.628;
    case 'tsp':
      return amount * 202.884;
    case 'fl.oz':
      return amount * 33.814;
    default:
      return amount;
  }
}

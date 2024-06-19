import { Dispatchable } from './general/dispatchable';
import { RatioOption } from './ratio';
import { Unit } from './unit';

export abstract class MethodProcess extends Dispatchable {
  constructor(
    readonly id: string,
    readonly method: string,
    readonly createdAt: Date,
    readonly ratio: RatioOption,
    readonly units: { water: Unit; coffee: Unit },
    readonly cups: Cups,
    readonly quantities: Quantities
  ) {
    super();
  }

  static builder() {
    return new MethodProcessBuilder();
  }
}

class FrenchPressProcess extends MethodProcess {
  private constructor(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    super(id, 'French Press', createdAt, ratio, units, cups, quantities);
  }

  static create(
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    const createdAt = new Date();
    const id = 'french-press-' + createdAt.getTime();

    return new FrenchPressProcess(
      id,
      createdAt,
      ratio,
      units,
      cups,
      quantities
    );
  }
  static restore(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    return new FrenchPressProcess(
      id,
      createdAt,
      ratio,
      units,
      cups,
      quantities
    );
  }
}

class V60Process extends MethodProcess {
  private constructor(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    super(id, 'V60', createdAt, ratio, units, cups, quantities);
  }

  static create(
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    const createdAt = new Date();
    const id = 'v60-' + createdAt.getTime();

    return new V60Process(id, createdAt, ratio, units, cups, quantities);
  }
  static restore(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    return new V60Process(id, createdAt, ratio, units, cups, quantities);
  }
}

class AeroPressProcess extends MethodProcess {
  private constructor(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    super(id, 'AeroPress', createdAt, ratio, units, cups, quantities);
  }

  static create(
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    const createdAt = new Date();
    const id = 'aero-press-' + createdAt.getTime();

    return new AeroPressProcess(id, createdAt, ratio, units, cups, quantities);
  }
  static restore(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    return new AeroPressProcess(id, createdAt, ratio, units, cups, quantities);
  }
}

class ChemexProcess extends MethodProcess {
  private constructor(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    super(id, 'Chemex', createdAt, ratio, units, cups, quantities);
  }

  static create(
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    const createdAt = new Date();
    const id = 'chemex-' + createdAt.getTime();

    return new ChemexProcess(id, createdAt, ratio, units, cups, quantities);
  }
  static restore(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    return new ChemexProcess(id, createdAt, ratio, units, cups, quantities);
  }
}

class MokaPotProcess extends MethodProcess {
  private constructor(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    super(id, 'Moka Pot', createdAt, ratio, units, cups, quantities);
  }

  static create(
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    const createdAt = new Date();
    const id = 'moka-pot-' + createdAt.getTime();

    return new MokaPotProcess(id, createdAt, ratio, units, cups, quantities);
  }
  static restore(
    id: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ) {
    return new MokaPotProcess(id, createdAt, ratio, units, cups, quantities);
  }
}

class MethodProcessFactory {
  static create(
    id: string,
    method: string,
    createdAt: Date,
    ratio: RatioOption,
    units: { water: Unit; coffee: Unit },
    cups: Cups,
    quantities: Quantities
  ): MethodProcess {
    switch (method) {
      case 'French Press':
        return id
          ? FrenchPressProcess.restore(
              id,
              createdAt,
              ratio,
              units,
              cups,
              quantities
            )
          : FrenchPressProcess.create(ratio, units, cups, quantities);
      case 'V60':
        return id
          ? V60Process.restore(id, createdAt, ratio, units, cups, quantities)
          : V60Process.create(ratio, units, cups, quantities);
      case 'AeroPress':
        return id
          ? AeroPressProcess.restore(
              id,
              createdAt,
              ratio,
              units,
              cups,
              quantities
            )
          : AeroPressProcess.create(ratio, units, cups, quantities);
      case 'Chemex':
        return id
          ? ChemexProcess.restore(id, createdAt, ratio, units, cups, quantities)
          : ChemexProcess.create(ratio, units, cups, quantities);
      case 'Moka Pot':
        return id
          ? MokaPotProcess.restore(
              id,
              createdAt,
              ratio,
              units,
              cups,
              quantities
            )
          : MokaPotProcess.create(ratio, units, cups, quantities);
      default:
        throw new Error(`Method ${method} not supported`);
    }
  }
}

class MethodProcessBuilder {
  private id = '';
  private method = '';
  private createdAt = new Date();
  private ratio = { coffee: 0, water: 0 } as RatioOption;
  private units = { water: 'ml' as Unit, coffee: 'g' as Unit };
  private cups = { amount: 0, volume: 0, unit: 'ml' as Unit } as Cups;
  private quantities = { water: 0, coffee: 0 } as Quantities;

  setMethod(method: string) {
    this.method = method;
    return this;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  setRatio(ratio: RatioOption) {
    this.ratio = ratio;
    return this;
  }

  setUnits(units: { water: Unit; coffee: Unit }) {
    this.units = units;
    return this;
  }

  setCups(cups: Cups) {
    this.cups = cups;
    return this;
  }

  setQuantities(quantities: Quantities) {
    this.quantities = quantities;
    return this;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  build() {
    return MethodProcessFactory.create(
      this.id,
      this.method,
      this.createdAt,
      this.ratio,
      this.units,
      this.cups,
      this.quantities
    );
  }
}

type Cups = {
  amount: number;
  volume: number;
  unit: Unit;
};

type Quantities = { water: number; coffee: number };

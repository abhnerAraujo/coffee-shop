export class Method {
  private constructor(readonly props: MethodProps) {}

  static getMethods(): Method[] {
    return [
      new Method({
        name: 'AeroPress',
        description: 'AeroPress',
        ratio: '1:16',
        waterTemperature: 200,
        grindSize: 3,
        brewTime: 60,
        water: 240,
      }),
    ];
  }
}

type MethodProps = {
  name: string;
  description: string;
  ratio: string;
  waterTemperature: number;
  grindSize: number;
  brewTime: number;
  bloomTime?: number;
  water: number;
};

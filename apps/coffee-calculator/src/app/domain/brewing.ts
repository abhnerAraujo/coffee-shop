import { uid } from './general/uid';
import { MethodProcess } from './method-process';

export interface BrewingProps {
  id: string;
  name: string;
  methodProcess: MethodProcess;
  description: string;
  steps: [Array<string>, Array<string>, Array<string>];
  tutorial: string;
  timer: number;
  createdAt: Date;
}
export class Brewing {
  private constructor(private props: BrewingProps) {}

  static create(
    props: Partial<Omit<BrewingProps, 'createdAt' | 'id'>> &
      Pick<BrewingProps, 'methodProcess' | 'name'>
  ) {
    return new Brewing({
      description: props.description || '',
      steps: props.steps || [[], [], []],
      methodProcess: props.methodProcess,
      name: props.name,
      timer: props.timer || 0,
      tutorial: props.tutorial || '',
      id: uid(),
      createdAt: new Date(),
    });
  }

  static restore(props: BrewingProps) {
    return new Brewing(props);
  }

  setName(name: string) {
    this.props.name = name;
  }

  getName() {
    return this.props.name;
  }

  setMethodProcess(methodProcess: MethodProcess) {
    this.props.methodProcess = methodProcess;
  }

  getMethodProcess() {
    return this.props.methodProcess;
  }

  setTips(tips: Array<string>) {
    this.props.steps[2] = tips;
  }

  getTips() {
    return [...this.props.steps[2]];
  }

  setTutorial(tutorial: string) {
    this.props.tutorial = tutorial;
  }

  getTutorial() {
    return this.props.tutorial;
  }

  setPreparation(preparation: Array<string>) {
    this.props.steps[0] = preparation;
  }

  getPreparation() {
    return [...this.props.steps[0]];
  }

  setSteps(brewing: Array<string>) {
    this.props.steps[1] = brewing;
  }

  getSteps() {
    return [...this.props.steps[1]];
  }

  setTimer(timer: number) {
    this.props.timer = timer;
  }

  getTimer() {
    return this.props.timer;
  }

  getId() {
    return this.props.id;
  }
}

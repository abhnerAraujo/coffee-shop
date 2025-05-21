import { Dispatchable } from './general/dispatchable';
import { uid } from './general/uid';
import { MethodProcess } from './method-process';

export interface BrewingProps {
  id: string;
  name: string;
  methodProcess: MethodProcess;
  description: string;
  steps: [Array<string>, Array<string>, Array<string>];
  timeline: Array<[number, string]>;
  properties: Array<{ name: string; value: string }>
  tutorial: string;
  timer: number;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    name: string;
  };
}
export class Brewing extends Dispatchable {
  private constructor(private props: BrewingProps) {
    super('Brewing');
  }

  static create(
    props: Partial<Omit<BrewingProps, 'createdAt' | 'id'>> &
      Pick<BrewingProps, 'methodProcess' | 'name'>
  ) {
    const brewing = new Brewing({
      description: props.description || '',
      properties: props.properties || [],
      steps: props.steps || [[], [], []],
      methodProcess: props.methodProcess,
      name: props.name,
      timer: props.timer || 0,
      tutorial: props.tutorial || '',
      timeline: props.timeline || [],
      id: uid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      author: props.author,
    });

    brewing.markForDispatch(Brewing.CREATE);
    return brewing;
  }

  static restore(props: BrewingProps) {
    const brewing = new Brewing(props);

    // brewing.update();
    return brewing;
  }

  setName(name: string) {
    this.props.name = name;
    this.update();
  }

  getName() {
    return this.props.name;
  }

  setTimeline(timeline: Array<[number, string]>) {
    this.props.timeline = timeline;
    this.update();
  }

  getTimeline() {
    return this.props.timeline;
  }

  setProperties(properties: Array<{ name: string; value: string }>) {
    this.props.properties = properties;
    this.update();
  }

  getProperties() {
    return this.props.properties;
  }

  setMethodProcess(methodProcess: MethodProcess) {
    this.props.methodProcess = methodProcess;
    this.update();
  }

  getMethodProcess() {
    return this.props.methodProcess;
  }

  setTips(tips: Array<string>) {
    this.props.steps[2] = tips;
    this.update();
  }

  getTips() {
    return [...this.props.steps[2]];
  }

  setTutorial(tutorial: string) {
    this.props.tutorial = tutorial;
    this.update();
  }

  getTutorial() {
    return this.props.tutorial;
  }

  setPreparation(preparation: Array<string>) {
    this.props.steps[0] = preparation;
    this.update();
  }

  getPreparation() {
    return [...this.props.steps[0]];
  }

  setSteps(brewing: Array<string>) {
    this.props.steps[1] = brewing;
    this.update();
  }

  getSteps() {
    return [...this.props.steps[1]];
  }

  setTimer(timer: number) {
    this.props.timer = timer;
    this.update();
  }

  getTimer() {
    return this.props.timer;
  }

  getId() {
    return this.props.id;
  }

  getCreatedAt() {
    return this.props.createdAt;
  }

  getUpdatedAt() {
    return this.props.updatedAt;
  }

  getDescription() {
    return this.props.description;
  }

  setDescription(description: string) {
    this.props.description = description;
    this.update();
  }

  setAuthor(author: BrewingProps['author']) {
    this.props.author = author;
    this.update();
  }

  getAuthor() {
    return this.props.author;
  }

  addTimelineItem(item: [number, string]) {
    this.props.timeline.push(item);
    this.reorderTimeline();
    this.update();
  }

  deleteTimelineItem(index: number) {
    this.props.timeline.splice(index, 1);
    this.reorderTimeline();
    this.update();
  }

  private reorderTimeline() {
    this.props.timeline = this.props.timeline.sort((a, b) => a[0] - b[0]);
  }

  toJson() {
    return { ...this.props };
  }

  private update() {
    this.props.updatedAt = new Date();
    this.markForDispatch(Brewing.UPDATE);
  }

  static extractPropertiesFromMethodProcess(methodProcess: MethodProcess) {
    return [
      {
        name: 'Ratio',
        value: `${methodProcess.ratio.coffee}:${methodProcess.ratio.water}`,
      },
      {
        name: `Water (${methodProcess.units.water})`,
        value: methodProcess.quantities.water.toString(),
      },
      {
        name: `Coffee (${methodProcess.units.coffee})`,
        value: methodProcess.quantities.coffee.toString(),
      },
      {
        name: 'Grind Size',
        value: methodProcess.grindSize.toString(),
      },
      {
        name: `Cup Size (${methodProcess.cups.unit})`,
        value: methodProcess.cups.volume.toString(),
      },
    ];
  }

  static updateBrewing(brewing: Brewing, changes: Partial<Brewing>) {
    Object.assign(brewing, changes);
    brewing.update();
  }

  static CREATE = 'Brewing.CREATE';
  static UPDATE = 'Brewing.UPDATE';
}

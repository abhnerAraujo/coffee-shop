import { EventDispatcher } from './event-dispatcher';

export abstract class Dispatchable {
  constructor(readonly name: string) {
    console.log('[Dispatchable]', this.name, 'created');
  }
  protected markForDispatch() {
    console.log('[Dispatchable]', this.name, 'dispatched');
    EventDispatcher.dispatch({
      name: this.name,
      payload: this,
    });
  }
}

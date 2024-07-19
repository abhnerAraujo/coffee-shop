import { EventDispatcher } from './event-dispatcher';

export abstract class Dispatchable {
  constructor(readonly name: string) {
    console.log('[Dispatchable]', this.name, 'created');
  }
  protected markForDispatch(event: string) {
    EventDispatcher.dispatch({
      name: event,
      payload: this,
    });
    console.log('[Dispatchable]', event, 'dispatched');
  }
}

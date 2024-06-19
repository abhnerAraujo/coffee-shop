import { EventDispatcher } from './event-dispatcher';

export abstract class Dispatchable {
  protected markForDispatch() {
    EventDispatcher.dispatch({
      name: this.constructor.name,
      payload: this,
    });
  }
}

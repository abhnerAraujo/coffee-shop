export class EventDispatcher {
  static listeners: { [key: string]: ((event: DomainEvent) => void)[] } = {};

  static listen(event: string, listener: (event: DomainEvent) => void) {
    console.log('[EventDispatcher]', event, 'listener add');
    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(listener);
  }

  static dispatch(event: DomainEvent) {
    console.log(
      '[EventDispatcher]',
      'event received to dispatch',
      this.listeners
    );
    if (!this.listeners[event.name]) return;

    this.listeners[event.name].forEach(listener => listener(event));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DomainEvent<T = any> {
  name: string;
  payload: T;
}

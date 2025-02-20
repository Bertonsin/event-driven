import type { Subscriber } from "./subscriber";

export class EventHandler {
  private subscribers: Set<{ [eventName: string]: Subscriber }> = new Set();
  private instance: EventHandler | null = null;

  public static create() {
    const eventHandler = new EventHandler();
    eventHandler.instance = eventHandler;
    return eventHandler;
  }

  public getInstance() {
    return this.instance;
  }

  public subscribe(eventName: string, subscriber: Subscriber) {
    this.subscribers.add({ [eventName]: subscriber })
  }

  public unSubscribe(eventName: string, subscriber: Subscriber) {
    this.subscribers.delete({ [eventName]: subscriber })
  }

  public notifySubscribers(eventName: string, context: string) {
    this.subscribers.forEach((subscriber) => {
      subscriber[eventName].update(context);
    })
  }

} 
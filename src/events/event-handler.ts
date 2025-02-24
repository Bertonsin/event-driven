import type { Event } from "../domain/Event";
import type { Subscriber } from "../domain/subscriber";

export class EventHandler {
  static #instance: EventHandler
  events: Set<Event> = new Set([]);

  private constructor() { }

  static get instance() {
    if (!EventHandler.#instance) {
      EventHandler.#instance = new EventHandler()
    }
    return EventHandler.#instance;
  }

  addSubscriberTo(eventName: string, subscriber: Subscriber) {
    const events = Array.from(this.events)
    const eventToSubscribe = events.find(event => event.name === eventName)
    eventToSubscribe?.attach(subscriber)
    if (!eventToSubscribe) {
      return
    }
    this.events.add(eventToSubscribe)
  }

  publish(event: Event) {
    this.events.add(event);
  }

  dispatch(eventName: string) {
    this.events.forEach(event => {
      if (event.name === eventName) {
        event.notify();
      }
    })
  }

}
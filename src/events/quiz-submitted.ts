import type { Event } from "../domain/Event";
import type { Subscriber } from "../domain/subscriber";

export class QuizSubmittedEvent implements Event {
  private readonly subscribers: Set<Subscriber> = new Set([])
  name = "QuizSubmitted";

  attach(subscriber: Subscriber): void {
    this.subscribers.add(subscriber)
  }

  dettach(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber);
  }

  notify(): void {
    this.subscribers.forEach((subscriber)=>subscriber.update(this))
  }
} 
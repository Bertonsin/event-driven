import type { Event } from "../domain/Event";
import type { Subscriber } from "../domain/subscriber";

export class QuizSubmittedSubscriber implements Subscriber {
  update(event: Event): void {
    console.log('Email sent', event.name)
  }
}
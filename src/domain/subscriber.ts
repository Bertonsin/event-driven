import type { Event } from "./Event";

export interface Subscriber {
  update(event: Event): void
}
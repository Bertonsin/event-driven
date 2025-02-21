import type { Subscriber } from "./subscriber";

export interface Event {
  name: string;
  attach(subscriber:Subscriber):void;
  dettach(subscriber:Subscriber):void;
  notify():void
}
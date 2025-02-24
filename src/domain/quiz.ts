import { randomUUIDv7 } from 'bun';
import { QuizSubmittedEvent } from '../events/quiz-submitted-event';
import { EventHandler } from './../events/event-handler';

interface QuizProps {
  id?: string
  questions: {
    name: string,
    answers: { value: string, description: string }[],
    correctAnswer: string
  }[]
}

export class Quiz {
  constructor(readonly props: QuizProps) {
    Object.assign(props, this)
  }

  static create(props: QuizProps) {
    EventHandler.instance.publish(new QuizSubmittedEvent());
    return new Quiz({
      id: randomUUIDv7(),
      questions: props.questions
    })
  }

  get id() {
    return this.props.id
  }

  get questions() {
    return this.props.questions;
  }
}
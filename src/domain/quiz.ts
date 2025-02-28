import { randomUUIDv7 } from 'bun';
import { QuizSubmittedEvent } from '../events/quiz-submitted-event';
import { Observer } from './observer';

interface QuizProps {
  id?: string
  questions: {
    name: string,
    answers: { value: string, description: string }[],
    correctAnswer: string
  }[]
}

export class Quiz extends Observer {
  constructor(readonly props: QuizProps) {
    super();
    Object.assign(props, this)
  }

  static create(props: QuizProps) {
    return new Quiz({
      id: randomUUIDv7(),
      questions: props.questions
    })
  }

  submit() {
    const event = new QuizSubmittedEvent(this.id, 'my email')
    this.notify("QuizSubmitted", event)
  }

  get id() {
    return this.props.id ?? ''
  }

  get questions() {
    return this.props.questions;
  }
}
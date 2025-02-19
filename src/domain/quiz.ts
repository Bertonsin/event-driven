interface QuizProps {
  id: string
  questions: { name: string, answers: { value: string, description: string }[], correctAnswer: string }[]
}

export class Quiz {
  constructor(readonly props: QuizProps) {
    Object.assign(props, this)
  }

  static create(props: QuizProps) {
    return new Quiz(props)
  }

  get id() {
    return this.props.id
  }

  get questions() {
    return this.props.questions;
  }
}
import type { Mediator } from "../../domain/mediator";
import { Quiz } from "../../domain/quiz";
import type { QuizSubmittedEvent } from "../../events/quiz-submitted-event";
import type { QuizRepository } from "../repositories/quiz/quiz-repository";

interface SubmitQuizUsecaseProps {
  questions: {
    name: string,
    answers: { value: string, description: string }[],
    correctAnswer: string
  }[]
}

export class SubmitQuizUsecase {
  constructor(readonly quizRepository: QuizRepository, readonly mediator: Mediator) { }
  async execute(input: SubmitQuizUsecaseProps) {
    const quiz = Quiz.create(input)
    await this.quizRepository.save(quiz)
    quiz.register("QuizSubmitted", (event: QuizSubmittedEvent) => {
      this.mediator.notify("QuizSubmitted", event)
    })
    quiz.submit();
    return { id: quiz.id };
  }
}
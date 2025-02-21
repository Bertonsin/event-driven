import { Quiz } from "../../domain/quiz";
import { QuizSubmittedEvent } from "../../events/quiz-submitted";
import { QuizSubmittedSubscriber } from "../../subscribers/quizSubmittedSubscriber";
import type { QuizRepository } from "../repositories/quiz/quiz-repository";

interface SubmitQuizUsecaseProps {
  questions: {
    name: string,
    answers: { value: string, description: string }[],
    correctAnswer: string
  }[]
}

export class SubmitQuizUsecase {
  constructor(readonly quizRepository: QuizRepository){}
  async execute(input: SubmitQuizUsecaseProps){
    const quiz = Quiz.create(input)
    await this.quizRepository.save(quiz)
    const quizSubmittedEvent = new QuizSubmittedEvent()
    const quizSubmittedSubscriber = new QuizSubmittedSubscriber()
    quizSubmittedEvent.attach(quizSubmittedSubscriber)
    quizSubmittedEvent.notify();
    return {id: quiz.id};
  }
}
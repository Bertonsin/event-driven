import { Quiz } from "../../domain/quiz";
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
    return { id: quiz.id };
  }
}
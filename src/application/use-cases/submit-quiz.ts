import { Quiz } from "../../domain/quiz";
import type { QuizRepository } from "../repositories/quiz/quiz-repository";

interface SubmitQuizUsecaseProps {
  quiz: Quiz
}

export class SubmitQuizUsecase {
  constructor(readonly quizRepository: QuizRepository){}
  async execute(input: SubmitQuizUsecaseProps){
    await this.quizRepository.save(input.quiz)
    return {id: input.quiz.id};
  }
}
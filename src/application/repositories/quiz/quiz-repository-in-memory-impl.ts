import type { Quiz } from "../../../domain/quiz";
import type { QuizRepository } from "./quiz-repository";

export class QuizRepositoryInMemoryImpl implements QuizRepository{

  public items: Quiz[] = []
  
  async save(quiz: Quiz): Promise<void> {
    this.items.push(quiz)
  }

  async findById(id: string): Promise<Quiz | null> {
      const quiz = this.items.find(item=>item.id === id)
      if(!quiz){
        return null
      }
      return quiz
  }
}
import { beforeEach, describe, expect, it } from 'bun:test';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';
import { SubmitQuizUsecase } from '../application/use-cases/submit-quiz';
import { Quiz } from '../domain/quiz';

describe("Submit quiz", ()=>{
  let usecase: SubmitQuizUsecase
  let repository: QuizRepository
  beforeEach(()=>{
    repository = new QuizRepositoryInMemoryImpl();
    usecase = new SubmitQuizUsecase(repository);
  })
  it("should be able to submit a quiz", async ()=>{
    const quiz = new Quiz({id: '01', questions:[]})
    const result = await usecase.execute({questions: quiz.questions})
    expect(result.id).toBeDefined()
  })
})
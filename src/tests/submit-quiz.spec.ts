import {describe, it, expect, beforeEach} from 'bun:test'
import { SubmitQuizUsecase } from '../application/use-cases/submit-quiz'
import { Quiz } from '../domain/quiz';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';

describe("Submit quiz", ()=>{
  let usecase: SubmitQuizUsecase
  let repository: QuizRepository
  beforeEach(()=>{
    repository = new QuizRepositoryInMemoryImpl();
    usecase = new SubmitQuizUsecase(repository);
  })
  it("should be able to submit a quiz", async ()=>{
    const quiz = new Quiz({id: '01', questions:[]})
    const result = await usecase.execute({quiz})
    expect(result.id).toBeDefined()
  })
})
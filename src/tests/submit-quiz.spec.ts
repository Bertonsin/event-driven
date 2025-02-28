import { beforeEach, describe, expect, it } from 'bun:test';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';
import { SendMailUsecase } from '../application/use-cases/send-mail';
import { SubmitQuizUsecase } from '../application/use-cases/submit-quiz';
import { Mediator } from '../domain/mediator';
import { Quiz } from '../domain/quiz';

describe("Submit quiz", () => {
  let usecase: SubmitQuizUsecase
  let repository: QuizRepository
  let callback: SendMailUsecase
  beforeEach(() => {
    const mediator = new Mediator()
    repository = new QuizRepositoryInMemoryImpl();
    usecase = new SubmitQuizUsecase(repository, mediator);
    callback = new SendMailUsecase()
    mediator.register("QuizSubmitted", (data: any) => callback.execute({ email: data.email }))
  })
  it("should be able to submit a quiz", async () => {
    const quiz = new Quiz({ id: '01', questions: [] })
    const result = await usecase.execute({ questions: quiz.questions })
    expect(result.id).toBeDefined()
  })
})
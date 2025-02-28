import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';
import { SendMailUsecase } from '../application/use-cases/send-mail';
import { SubmitQuizUsecase } from '../application/use-cases/submit-quiz';
import { Mediator } from '../domain/mediator';
import { Quiz } from '../domain/quiz';

describe("Send email", () => {
  let submitQuiz: SubmitQuizUsecase
  let repository: QuizRepository
  let usecase: SendMailUsecase
  let mockFn: any

  beforeEach(() => {
    const mediator = new Mediator()
    repository = new QuizRepositoryInMemoryImpl();
    submitQuiz = new SubmitQuizUsecase(repository, mediator);
    usecase = new SendMailUsecase();
    mockFn = spyOn(usecase, 'execute')
    mediator.register("QuizSubmitted", usecase.execute)
    mediator.register("QuizSubmitted", () => {
      console.log("Validate quiz")
    })
  })
  it("Should be able to send email when quiz is submitted", async () => {
    const quiz = new Quiz({ id: '01', questions: [] })
    await submitQuiz.execute({ questions: quiz.questions })
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
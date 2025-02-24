import { beforeEach, describe, expect, it } from 'bun:test';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';
import { SubmitQuizUsecase } from '../application/use-cases/submit-quiz';
import { Quiz } from '../domain/quiz';
import { EventHandler } from '../events/event-handler';
import { QuizSubmittedSubscriber } from '../subscribers/quizSubmittedSubscriber';

describe("Send email", () => {
  let usecase: SubmitQuizUsecase
  let repository: QuizRepository
  beforeEach(() => {
    repository = new QuizRepositoryInMemoryImpl();
    usecase = new SubmitQuizUsecase(repository);
  })
  it("Should be able to send email when quiz is submitted", async () => {
    const quiz = new Quiz({ id: '01', questions: [] })
    const result = await usecase.execute({ questions: quiz.questions })
    EventHandler.instance.addSubscriberTo("QuizSubmitted", new QuizSubmittedSubscriber())
    expect(result.id).toBeDefined()
  })
})
import { beforeEach, describe, expect, it } from 'bun:test';
import type { QuizRepository } from '../application/repositories/quiz/quiz-repository';
import { QuizRepositoryInMemoryImpl } from '../application/repositories/quiz/quiz-repository-in-memory-impl';
import { CorrectQuiz } from '../application/use-cases/correct-quiz';
import { Quiz } from '../domain/quiz';

describe("Correct quiz", () => {
  let usecase: CorrectQuiz
  let repository: QuizRepository
  beforeEach(() => {
    repository = new QuizRepositoryInMemoryImpl();
    usecase = new CorrectQuiz(repository);
  })
  it("should be able to submit a quiz", async () => {
    const quiz = new Quiz({ id: '01', questions: [{ answers: [{ value: 'a', description: 'Sim' }, { value: 'b', description: 'Não' }], name: 'Typescript é bom?', correctAnswer: 'a' }, { answers: [{ value: 'a', description: 'Sim' }, { value: 'b', description: 'Não' }], name: 'Golang é bom?', correctAnswer: 'b' }] })
    repository.save(quiz)
    const result = await usecase.execute({ id: quiz.id ?? '', answers: [{ value: 'b' }, { value: 'b' }] })
    expect(result.score).toBeDefined()
    expect(result.score).toBe(50)
  })
})
import { describe, it, expect } from 'bun:test'
import { Quiz } from '../domain/quiz';

describe("Quiz", () => {
  it("Should be able to create a quiz", () => {
    const quiz = new Quiz({ id: '01', questions: [{ answers: [{ value: 'b', description: 'Sim' }, { value: 'a', description: 'Não' }], correctAnswer: 'a', name: 'Typescript é bom?' }] })
    expect(quiz.id).toBeDefined();
    expect(quiz.questions.length).toBeGreaterThan(0)
  })
})
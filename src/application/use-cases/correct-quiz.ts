import type { QuizRepository } from "../repositories/quiz/quiz-repository";

interface CorrectQuizProps {
  id: string
  answers: {value: string}[]
}

export class CorrectQuiz {
  constructor(readonly quizRepository: QuizRepository){}
  async execute(input: CorrectQuizProps){
    const quiz = await this.quizRepository.findById(input.id)
    let correctAnswers = 0
    if(!quiz){
      throw new Error("Quiz não encontrado!")
    }
    quiz.questions.forEach((question, index)=>{
      if(input.answers[index].value === question.correctAnswer){
        correctAnswers++
      }
    })
    const totalOfQuestions = quiz.questions.length
    const score = correctAnswers/totalOfQuestions * 100
    return { score }
  }
}
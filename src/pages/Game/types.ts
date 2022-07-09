interface IObjectKeys {
  [key: string]: number;
}

export interface IPointsMeasure extends IObjectKeys {
    easy: number
    medium: number
    hard: number
}

export interface IAnswers {
  isCorrect: boolean
  testId: string
  title: string
}

export interface IQuestions {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  answers?: IAnswers[]
  type: string
}

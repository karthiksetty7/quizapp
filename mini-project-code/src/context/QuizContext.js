import React from 'react'

const QuizContext = React.createContext({
  score: 0,
  answersList: [],
  questionsList: [], // Added to store original questions from API
  updateScore: () => {},
  addAnswer: () => {},
  setQuestionsList: () => {}, // Added to save data globally
  resetQuiz: () => {},
})

export default QuizContext
// API status constants used across the application
// Helps to manage loading, success and failure states

export const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Quiz timer limit for each question
export const TIMER_LIMIT = 15

// Quiz result minimum score to win
export const MINIMUM_SCORE = 5

// Login API URL
export const loginApiUrl = 'https://apis.ccbp.in/login'

// Questions API URL
export const questionsApiUrl =
  'https://apis.ccbp.in/assess/questions'
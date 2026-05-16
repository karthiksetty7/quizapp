import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import QuizGame from './pages/QuizGame'
import GameResults from './pages/GameResults'
import GameReport from './pages/GameReport'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import QuizContext from './context/QuizContext'
import './App.css'

class App extends Component {
  state = {
    score: 0,
    answersList: [],
    questionsList: [], // Track full list globally
  }

  updateScore = () => {
    this.setState(prevState => ({score: prevState.score + 1}))
  }

  addAnswer = answerDetails => {
    this.setState(prevState => ({
      answersList: [...prevState.answersList, answerDetails],
    }))
  }

  // Implementation for the new context function
  setQuestionsList = list => {
    this.setState({questionsList: list})
  }

  resetQuiz = () => {
    this.setState({
      score: 0,
      answersList: [],
      questionsList: [],
    })
  }

  render() {
    const {score, answersList, questionsList} = this.state

    return (
      <QuizContext.Provider
        value={{
          score,
          answersList,
          questionsList,
          updateScore: this.updateScore,
          addAnswer: this.addAnswer,
          setQuestionsList: this.setQuestionsList,
          resetQuiz: this.resetQuiz,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
            <ProtectedRoute exact path="/game-results" component={GameResults} />
            <ProtectedRoute exact path="/game-report" component={GameReport} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </QuizContext.Provider>
    )
  }
}

export default App
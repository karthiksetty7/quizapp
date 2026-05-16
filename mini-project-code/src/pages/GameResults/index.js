import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import QuizContext from '../../context/QuizContext'
import Header from '../../components/Header'
import {MINIMUM_SCORE} from '../../utils/constants'
import './index.css'

class GameResults extends Component {
  onClickPlayAgain = () => {
    this.context.resetQuiz()
    const {history} = this.props
    history.replace('/')
  }

  onClickViewReport = () => {
    const {history} = this.props
    history.push('/game-report')
  }

  renderWinView = (score, total) => {
    const percentage = (score / total) * 100
    return (
      <div className="result-card won-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
          alt="won"
          className="result-image"
        />
        <h1 className="result-heading">Congrats!</h1>
        <h1 className="percentage-text">{percentage}% Correctly Answered</h1>
        <p className="quiz-status-msg">Quiz completed successfully.</p>
        <p className="score-summary-text">
          You attempted {score} out of {total} questions as correct.
        </p>
        <button
          type="button"
          className="report-button-blue"
          onClick={this.onClickViewReport}
        >
          Report
        </button>
      </div>
    )
  }

  renderLoseView = (score, total) => {
    const percentage = (score / total) * 100
    return (
      <div className="result-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
          alt="lose"
          className="result-image"
        />
        <h1 className="result-heading">You lose!</h1>
        <h1 className="percentage-text">{percentage}% Correctly Answered</h1>
        <p className="score-summary-text">
          You attempted {score} out of {total} questions as correct.
        </p>
        <button
          type="button"
          className="report-button-blue"
          onClick={this.onClickViewReport}
        >
          Report
        </button>
      </div>
    )
  }

  render() {
    return (
      <QuizContext.Consumer>
        {value => {
          const {score} = value
          const totalQuestions = 10 
          const isWon = (score / totalQuestions) * 100 >= 60

          return (
            <div className="game-results-page-container">
              <Header />
              <div className="game-results-content-container">
                {isWon
                  ? this.renderWinView(score, totalQuestions)
                  : this.renderLoseView(score, totalQuestions)}
              </div>
            </div>
          )
        }}
      </QuizContext.Consumer>
    )
  }
}

GameResults.contextType = QuizContext
export default withRouter(GameResults)
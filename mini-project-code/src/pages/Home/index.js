import {withRouter} from 'react-router-dom'
import Header from '../../components/Header'
import QuizContext from '../../context/QuizContext' // Import context
import './index.css'

const Home = props => (
  <QuizContext.Consumer>
    {value => {
      const {resetQuiz} = value

      const onClickStartQuiz = () => {
        const {history} = props
        // Reset the score and answers list before starting a new game
        resetQuiz() 
        history.push('/quiz-game')
      }

      return (
        <div className="home-page-container">
          <Header />
          <div className="home-content-container">
            <div className="home-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
                alt="start quiz game"
                className="home-image"
              />

              <h1 className="home-heading">
                How Many Of These Questions Do You Actually Know?
              </h1>

              <p className="home-description">
                Test yourself with these easy quiz questions and answers
              </p>

              <button
                type="button"
                className="start-quiz-button"
                onClick={onClickStartQuiz}
              >
                Start Quiz
              </button>

              <div className="warning-container">
                <img 
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png" 
                  alt="warning icon" 
                  className="warning-icon" 
                />
                <p className="warning-text">
                  All the progress will be lost, if you reload during the quiz
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </QuizContext.Consumer>
)

export default withRouter(Home)
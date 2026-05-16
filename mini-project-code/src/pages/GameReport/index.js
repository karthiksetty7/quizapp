import {Component} from 'react'
import QuizContext from '../../context/QuizContext'
import Header from '../../components/Header'
import './index.css'

class GameReport extends Component {
  renderOption = (option, optionsType, correctOptionId, index) => {
    const isCorrect = option.id === correctOptionId

    const alphabets = ['A', 'B', 'C', 'D']

    let optionClassName = ''

    if (optionsType === 'DEFAULT') {
      optionClassName = isCorrect
        ? 'default-option-box correct-bg'
        : 'default-option-box normal-bg'
    } else if (optionsType === 'IMAGE') {
      optionClassName = `image-option-container ${
        isCorrect ? 'correct-image-border' : ''
      }`
    } else if (optionsType === 'SINGLE_SELECT') {
      optionClassName = 'single-select-option-container'
    }

    return (
      <div key={option.id} className="report-option-external-wrapper">
        <li className={optionClassName}>
          {optionsType === 'SINGLE_SELECT' && (
            <div
              className={`custom-radio-circle ${
                isCorrect ? 'radio-active' : ''
              }`}
            >
              <div className="radio-dot" />
            </div>
          )}

          {optionsType === 'IMAGE' && (
            <img
              src={option.image_url}
              alt={option.text}
              className="report-img-element"
            />
          )}

          {(optionsType === 'DEFAULT' ||
            optionsType === 'SINGLE_SELECT') && (
            <p
              className={`option-text-content ${
                isCorrect && optionsType === 'SINGLE_SELECT'
                  ? 'highlight-text'
                  : ''
              }`}
            >
              {optionsType === 'DEFAULT' && (
                <span className="alpha-prefix">
                  {alphabets[index]}.
                </span>
              )}

              {option.text}
            </p>
          )}
        </li>

        <div className="tick-anchor">
          {isCorrect && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
              alt="correct checked circle"
              className="report-tick-icon"
            />
          )}
        </div>
      </div>
    )
  }

  renderQuestionCard = question => {
    const {
      id,
      questionText,
      options,
      correctOptionId,
      optionsType,
    } = question

    const listClass =
      optionsType === 'SINGLE_SELECT'
        ? 'stack-list-view'
        : 'grid-list-view'

    return (
      <li key={id} className="question-report-card">
        <p className="question-text-heading">{questionText}</p>

        <ul className={`options-list-root ${listClass}`}>
          {options.map((each, index) =>
            this.renderOption(
              each,
              optionsType,
              correctOptionId,
              index,
            ),
          )}
        </ul>
      </li>
    )
  }

  render() {
    return (
      <QuizContext.Consumer>
        {value => {
          const {answersList, questionsList} = value

          const correctCount = answersList.filter(
            ans => ans.isCorrect,
          ).length

          const unattempted = answersList.filter(
            ans => ans.isUnattempted,
          )

          const total = questionsList.length

          const isAllAttempted = unattempted.length === 0

          return (
            <div className="report-page-bg">
              <Header />

              <div className="report-card-wrapper">
                <div className="report-main-white-card">
                  <div
                    className={`card-fixed-header ${
                      isAllAttempted ? 'compact-header' : ''
                    }`}
                  >
                    <div className="summary-section">
                      <div className="score-circle-ring">
                        <div className="fractional-score">
                          <span className="score-now">
                            {correctCount}
                          </span>

                          <span className="slash">/</span>

                          <span className="score-total">
                            {total}
                          </span>
                        </div>
                      </div>

                      <div className="legend-section">
                        <div className="legend-row">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                            alt="correct"
                            className="leg-img"
                          />

                          <p className="leg-label">
                            {correctCount} Correct answers
                          </p>
                        </div>

                        <div className="legend-row">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                            alt="wrong"
                            className="leg-img"
                          />

                          <p className="leg-label">
                            {total -
                              correctCount -
                              unattempted.length}{' '}
                            Wrong answers
                          </p>
                        </div>

                        <div className="legend-row">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-attempted-check-img.png"
                            alt="unattempted"
                            className="leg-img"
                          />

                          <p className="leg-label">
                            {unattempted.length} Unattempted
                          </p>
                        </div>
                      </div>
                    </div>

                    {unattempted.length > 0 && (
                      <h1 className="unattempted-main-title">
                        Unattempted Questions
                      </h1>
                    )}
                  </div>

                  {unattempted.length > 0 ? (
                    <div className="questions-scroll-area">
                      <ul className="master-questions-list">
                        {unattempted.map(each =>
                          this.renderQuestionCard(each),
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div className="attempted-all-layout">
                      <h1 className="attempted-all-text">
                        Attempted all the questions
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </QuizContext.Consumer>
    )
  }
}

export default GameReport
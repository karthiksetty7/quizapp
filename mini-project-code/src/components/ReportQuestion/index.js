import './index.css'

const ReportQuestion = props => {
  const {questionReport} = props

  const {
    questionText,
    options,
    selectedOptionId,
    correctOptionId,
    optionsType,
  } = questionReport

  // Check states
  const isUnAttempted = selectedOptionId === ''

  // Render Text / Image Option Content
  const renderOptionContent = option => {
    if (optionsType === 'IMAGE') {
      return (
        <img
          src={option.image_url}
          alt={option.text}
          className="report-option-img-item"
        />
      )
    }

    return (
      <p className="report-option-text-content">
        {option.text}
      </p>
    )
  }

  // Render all options
  const renderOptions = () => {
    let listClassName = 'report-options-list-default'

    if (optionsType === 'IMAGE') {
      listClassName = 'report-options-list-image'
    }

    if (optionsType === 'SINGLE_SELECT') {
      listClassName = 'report-options-list-single'
    }

    return (
      <ul className={listClassName}>
        {options.map(eachOption => {
          const isSelected =
            eachOption.id === selectedOptionId

          const isCorrect =
            eachOption.id === correctOptionId

          let optionClassName =
            'report-option-wrapper'

          // Correct Answer
          if (isCorrect) {
            optionClassName +=
              ' correct-answer-option'
          }

          // Wrong Selected Answer
          if (isSelected && !isCorrect) {
            optionClassName +=
              ' wrong-answer-option'
          }

          let statusIcon = ''

          if (isCorrect) {
            statusIcon =
              'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
          } else if (
            isSelected &&
            !isCorrect
          ) {
            statusIcon =
              'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
          }

          return (
            <li
              key={eachOption.id}
              className="report-option-li"
            >
              <div className={optionClassName}>
                <div className="report-option-content">
                  {renderOptionContent(eachOption)}
                </div>

                {statusIcon !== '' && (
                  <img
                    src={statusIcon}
                    alt="status"
                    className="report-status-icon"
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <li className="report-question-item">
      <p className="report-question-text">
        {questionText}
      </p>

      {/* Show all options for ALL questions */}
      {renderOptions()}

      {/* Extra text only for unattempted */}
      {isUnAttempted && (
        <div className="unattempted-message-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
            alt="unattempted"
            className="report-status-icon"
          />

          <p className="unattempted-message">
            Not Attempted
          </p>
        </div>
      )}
    </li>
  )
}

export default ReportQuestion
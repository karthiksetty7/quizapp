import './index.css'

const OptionSingleSelect = props => {
  const {
    optionDetails,
    onSelectOption,
    isOptionSelected,
    selectedOptionId,
    correctOptionId,
  } = props

  const {id, text} = optionDetails

  const getOptionClassName = () => {
    if (!isOptionSelected) return 'single-select-option'

    if (id === correctOptionId) return 'correct-single-option'

    if (id === selectedOptionId && id !== correctOptionId) {
      return 'wrong-single-option'
    }

    return 'disabled-single-option'
  }

  const renderStatusIcon = () => {
    if (!isOptionSelected) return null

    if (id === correctOptionId) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="single-select-status-icon"
        />
      )
    }

    if (id === selectedOptionId && id !== correctOptionId) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
          className="single-select-status-icon"
        />
      )
    }

    return null
  }

  const onClickOption = () => {
    onSelectOption(optionDetails)
  }

  return (
    <li className="single-select-item">
      <button
        type="button"
        className={getOptionClassName()}
        onClick={onClickOption}
        disabled={isOptionSelected}
      >
        <div className="single-select-content-row">
          <div className="single-select-left-section">
            <div
              className={`radio-circle ${
                id === selectedOptionId ? 'active-radio-border' : ''
              }`}
            >
              {selectedOptionId === id && <div className="radio-inner-circle" />}
            </div>

            <p className="single-select-text">{text}</p>
          </div>

          {renderStatusIcon()}
        </div>
      </button>
    </li>
  )
}

export default OptionSingleSelect
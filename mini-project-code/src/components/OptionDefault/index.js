// Importing CSS file
import './index.css'

// Option default component
const OptionDefault = props => {
  // Destructuring props
  const {
    optionDetails,
    onSelectOption,
    isOptionSelected,
    selectedOptionId,
    correctOptionId,
    optionIndex,
  } = props

  // Destructuring option details
  const {id, text} = optionDetails

  // Convert index into alphabet (A, B, C, D...)
  const optionLabel = String.fromCharCode(65 + optionIndex)

  // Function to determine option class
  const getOptionClassName = () => {
    // Before selecting any option
    if (!isOptionSelected) {
      return 'default-option-button'
    }

    // Correct selected option
    if (id === selectedOptionId && id === correctOptionId) {
      return 'correct-option'
    }

    // Wrong selected option
    if (id === selectedOptionId && id !== correctOptionId) {
      return 'wrong-option'
    }

    // Highlighting correct option
    if (id === correctOptionId) {
      return 'correct-option'
    }

    // Default disabled option
    return 'disabled-option'
  }

  // Function to render option status icon
  const renderStatusIcon = () => {
    // Correct selected option
    if (id === selectedOptionId && id === correctOptionId) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="option-status-icon"
        />
      )
    }

    // Wrong selected option
    if (id === selectedOptionId && id !== correctOptionId) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
          className="option-status-icon"
        />
      )
    }

    // Highlight correct answer
    if (
      id === correctOptionId &&
      selectedOptionId !== correctOptionId
    ) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="option-status-icon"
        />
      )
    }

    return null
  }

  return (
    <li className="default-option-item">
      <div className="option-wrapper">
        <button
          type="button"
          className={getOptionClassName()}
          onClick={() => onSelectOption(optionDetails)}
          disabled={isOptionSelected}
        >
          <p className="default-option-text">
            {optionLabel}. {text}
          </p>
        </button>

        {/* Status Icon */}
        <div className="status-icon-container">
          {renderStatusIcon()}
        </div>
      </div>
    </li>
  )
}

export default OptionDefault
import {Component} from 'react'
import OptionDefault from '../OptionDefault'
import OptionImage from '../OptionImage'
import OptionSingleSelect from '../OptionSingleSelect'
import './index.css'

class QuestionCard extends Component {
  state = {
    selectedOptionId: '',
    isOptionSelected: false,
    isTimeUp: false,
  }

  onSelectOption = optionDetails => {
    const {questionDetails, onAnswerQuestion, stopTimer} = this.props
    const {isOptionSelected, isTimeUp} = this.state

    if (isOptionSelected || isTimeUp) return

    const correctOption = questionDetails.options.find(
      eachOption => eachOption.is_correct === 'true',
    )

    stopTimer()

    this.setState({
      selectedOptionId: optionDetails.id,
      isOptionSelected: true,
    })

    onAnswerQuestion({
      questionId: questionDetails.id,
      selectedOptionId: optionDetails.id,
      isCorrect: optionDetails.id === correctOption.id,
      correctOptionId: correctOption.id,
      questionDetails,
    })
  }

  componentDidUpdate(prevProps) {
    const {questionDetails} = this.props
    if (prevProps.questionDetails.id !== questionDetails.id) {
      this.setState({
        selectedOptionId: '',
        isOptionSelected: false,
        isTimeUp: false,
      })
    }
  }

  renderOptions = correctOptionId => {
    const {questionDetails} = this.props
    const {selectedOptionId, isOptionSelected, isTimeUp} = this.state

    const finalCorrectOptionId =
      isOptionSelected || isTimeUp ? correctOptionId : ''

  return questionDetails.options.map((eachOption, index) => {
  const commonProps = {
    key: eachOption.id,
    optionDetails: eachOption,
    optionIndex: index, // ✅ ADD THIS LINE
    onSelectOption: this.onSelectOption,
    isOptionSelected,
    selectedOptionId,
    correctOptionId: finalCorrectOptionId,
    isTimeUp,
  }

  if (questionDetails.options_type === 'DEFAULT') {
    return <OptionDefault {...commonProps} />
  }
  if (questionDetails.options_type === 'IMAGE') {
    return <OptionImage {...commonProps} />
  }
  return <OptionSingleSelect {...commonProps} />
})
  }

  render() {
    const {
      questionDetails,
      currentQuestionIndex,
      totalQuestions,
      timer,
      onClickNextQuestion,
      onClickSubmitQuiz,
    } = this.props

    const {isOptionSelected, isTimeUp} = this.state
    const correctOption = questionDetails.options.find(
      eachOption => eachOption.is_correct === 'true',
    )

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1

    // Target design uses a 2-column grid for both Default and Image types on desktop
    const optionsClassName = 
      questionDetails.options_type === 'SINGLE_SELECT' 
        ? 'options-stack' 
        : 'options-grid-layout'

    return (
      <div className="question-card-container">
        <div className="question-header-row">
          <div className="question-count-badge">
            <p className="badge-label">Question</p>
            <p className="badge-value">
              {currentQuestionIndex + 1}/{totalQuestions}
            </p>
          </div>
          <div className="timer-circle">
            <p className="timer-value">{timer}</p>
          </div>
        </div>

        <div className="question-content">
          <p className="question-text">{questionDetails.question_text}</p>
          <ul className={`options-list-container ${optionsClassName}`}>
            {this.renderOptions(correctOption.id)}
          </ul>
        </div>

        <div className="question-actions">
          {!isLastQuestion ? (
            <button
              type="button"
              className="next-btn"
              disabled={!(isOptionSelected || isTimeUp)}
              onClick={onClickNextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              type="button"
              className="next-btn"
              disabled={!(isOptionSelected || isTimeUp)}
              onClick={onClickSubmitQuiz}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default QuestionCard
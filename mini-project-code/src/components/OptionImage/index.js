import './index.css'

const OptionImage = props => {
const {
optionDetails,
onSelectOption,
isOptionSelected,
selectedOptionId,
correctOptionId,
} = props

const {id, image_url, text} = optionDetails

const getOptionClassName = () => {
if (!isOptionSelected) return 'image-option-button'
if (id === correctOptionId) return 'correct-image-option'
if (id === selectedOptionId && id !== correctOptionId) return 'wrong-image-option'
return 'disabled-image-option'
}

const renderStatusIcon = () => {
if (!isOptionSelected) return null

if (id === correctOptionId) {
return (
<img
src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
alt="correct checked circle"
className="image-option-status-icon"
/>
)
}

if (id === selectedOptionId && id !== correctOptionId) {
return (
<img
src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
alt="incorrect close circle"
className="image-option-status-icon"
/>
)
}
return null
}

return (
<li className="image-option-item">
<div className="image-option-wrapper">
<button
type="button"
className={getOptionClassName()}
onClick={() => onSelectOption(optionDetails)}
disabled={isOptionSelected}
>
<img src={image_url} alt={text} className="option-image" />
</button>

{/* External Icon sitting next to the image button */}
<div className="image-external-status-icon">
{renderStatusIcon()}
</div>
</div>
</li>
)
}

export default OptionImage 
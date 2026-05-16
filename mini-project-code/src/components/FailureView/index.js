import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  return (
    <div className="failure-view-bg-container">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Something went wrong</h1>
        <p className="failure-description">
          Our server are busy please try again
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={onClickRetry}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default FailureView
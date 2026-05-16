import "./index.css";

const NotFound = () => (
  <div className="not-found-page-container">
    <div className="not-found-content-container">
      {/* Target Image from Desktop_Not_Found_View.png */}
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />

      {/* Heading */}
      <h1 className="not-found-heading">Page Not Found</h1>

      {/* Updated Description to match target text */}
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
);

export default NotFound;
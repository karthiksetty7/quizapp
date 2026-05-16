import {withRouter, Link} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="header-content">
        {/* Updated Website Logo to match Screenshot (910).png */}
        <Link to="/" className="website-logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        {/* Desktop Logout Button */}
        <button
          type="button"
          className="logout-button desktop-logout"
          onClick={onClickLogout}
        >
          Logout
        </button>

        {/* Mobile Logout Icon Button */}
        <button
          type="button"
          className="logout-icon-button mobile-logout"
          onClick={onClickLogout}
          aria-label="logout"
        >
          <FiLogOut size={25} />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
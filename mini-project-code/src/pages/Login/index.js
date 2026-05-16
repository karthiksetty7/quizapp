import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {postApiData} from '../../utils/api'
import {loginApiUrl} from '../../utils/constants'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username: username.trim(),
      password: password.trim(),
    }

    const responseData = await postApiData(loginApiUrl, userDetails)

    if (responseData.ok === true) {
      this.onSubmitSuccess(responseData.data.jwt_token)
    } else {
      this.onSubmitFailure(responseData.data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showPassword, errorMessage} = this.state

    return (
      <div className="login-page-container">
        <div className="login-card">
          {/* Target Logo from Login.jpg/Login.png */}
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="login website logo"
            className="login-website-logo"
          />

          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="show-password-container">
              <input
                id="showPassword"
                type="checkbox"
                className="checkbox-input"
                checked={showPassword}
                onChange={this.onToggleShowPassword}
              />
              <label htmlFor="showPassword" className="show-password-label">
                Show Password
              </label>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            {errorMessage !== '' && (
              <p className="error-message">*{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
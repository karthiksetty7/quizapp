// Importing required packages
import {Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

// Protected route component
const ProtectedRoute = props => {
  // Getting JWT token
  const jwtToken = Cookies.get('jwt_token')

  // If token exists allow access
  if (jwtToken !== undefined) {
    return <Route {...props} />
  }

  // Otherwise redirect to login page
  return <Redirect to="/login" />
}

export default ProtectedRoute
// Importing js-cookie package
import Cookies from 'js-cookie'

// Function to check whether user is authenticated or not
export const isAuthenticated = () => {
  const jwtToken = Cookies.get('jwt_token')

  return jwtToken !== undefined
}

// Function to remove token during logout
export const logoutUser = () => {
  Cookies.remove('jwt_token')
}
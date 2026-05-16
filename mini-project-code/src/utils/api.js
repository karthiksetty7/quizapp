// Importing js-cookie package
import Cookies from 'js-cookie'

// Reusable GET API request function
export const getApiData = async url => {
  // Getting JWT token from cookies
  const jwtToken = Cookies.get('jwt_token')

  // API request options
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

  // Fetching data
  const response = await fetch(url, options)

  // Converting response to JSON
  const data = await response.json()

  return {
    ok: response.ok,
    data,
  }
}

// Reusable POST API request function
export const postApiData = async (url, requestData) => {
  // API request options
  const options = {
    method: 'POST',
    body: JSON.stringify(requestData),
  }

  // Sending POST request
  const response = await fetch(url, options)

  // Converting response to JSON
  const data = await response.json()

  return {
    ok: response.ok,
    data,
  }
}
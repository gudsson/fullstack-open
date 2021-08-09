export const initializeLogin = () => {
  const loggedUserJSON = window.localStorage.getItem('loginSessionData')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : {}
}

const loginReducer = (state = initializeLogin(), action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return {}
    default:
      return state
  }
}

export const loginUser = (data) => {
  window.localStorage.setItem('loginSessionData', JSON.stringify(data))
  return {
    type: 'LOGIN_USER',
    data
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loginSessionData')
  return {
    type: 'LOGOUT_USER'
  }
}

export default loginReducer
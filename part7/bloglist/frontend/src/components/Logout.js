import React from 'react'
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const username = useSelector(state => state.login.username)

  const logout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(setNotification(`${username} successfully logged out`, 'success', 5))
  }

  return (
    <p>{username} <button onClick={logout}>logout</button></p>
  )
}

export default Logout
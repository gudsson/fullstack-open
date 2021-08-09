import React from 'react'
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import Title from './Title'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(state => state.login.token)

  const username = useSelector(state => state.login.username)

  const logout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(setNotification(`${username} successfully logged out`, 'success', 5))
    history.push('/')
  }

  if (!token) return <></>

  return (
    <div>
      <Title />
      <p>{username} logged in</p>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Logout
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const token = useSelector(state => state.login.token)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogsService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(setNotification(`${user.name} successfully logged in`, 'success', 5))

      setUsername('')
      setPassword('')
    } catch (exception) {

      dispatch(setNotification('Login failed: wrong credentials', 'failure', 5))
    }
    console.log('logging in with', username, password)
  }

  if (token) return <></>

  return (
    <div className="formDiv">
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-btn' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
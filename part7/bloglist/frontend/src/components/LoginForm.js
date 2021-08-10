import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

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
    <div>
      <h2>login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id='login-btn' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
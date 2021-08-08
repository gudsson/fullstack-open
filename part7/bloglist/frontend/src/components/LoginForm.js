import PropTypes from 'prop-types'
import React, { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const LoginForm = ({ user, setUser, updateBanner }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      updateBanner({
        response: 'success',
        message: `${user.name} successfully logged in`
      })
    } catch (exception) {
      updateBanner({
        response: 'error',
        message: 'Wrong credentials'
      })
    }
    console.log('logging in with', username, password)
  }

  if (user !== null) return <></>

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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  updateBanner: PropTypes.func.isRequired
}

export default LoginForm
import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Users from './components/Users'
import User from './components/User'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  useEffect(() => blogsService.setToken(loggedUser.token), [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <Router>
      <Notification />
      <Logout />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <LoginForm />
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Nav from './components/Nav'
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
      <Nav />
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogView />
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
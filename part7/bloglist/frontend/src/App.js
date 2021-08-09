import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  useEffect(() => blogsService.setToken(loggedUser.token), [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <LoginForm />
      <Blogs />
    </div>
  )
}

export default App
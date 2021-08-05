import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogsService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} />
      <LoginForm
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />
      <Blogs
        user={user}
        setUser={setUser}
        blogs={blogs}
        setBlogs={setBlogs}
        setErrorMessage={setErrorMessage}
      />
    </div>
  )
}

export default App
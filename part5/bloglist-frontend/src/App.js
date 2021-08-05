import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    <Notification message={errorMessage} />

    return (
      <LoginForm
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />
    )
  }

  return <Blogs blogs={blogs} />

}

export default App
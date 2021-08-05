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

  

  // const loginForm = () => (
  //   <>
  //     <h2>login to application</h2>
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         username
  //           <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           onChange={({ target }) => setUsername(target.value)}
  //         />
  //       </div>
  //       <div>
  //         password
  //           <input
  //           type="password"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //       </div>
  //       <button type="submit">login</button>
  //     </form>
  //   </>    
  // )

  // const blogsForm = () => (
  //   <div>
  //     <h2>blogs</h2>
  //     {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} />
  //     )}
  //   </div>
  // )

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
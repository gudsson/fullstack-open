import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogsService from './services/blogs'

const App = () => {
  // const [bannerObj, setBannerObj] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  // const updateBanner = (banner) => {
  //   setBannerObj(banner)
  //   setTimeout(() => {
  //     setBannerObj(null)
  //   }, 5000)
  // }

  return (
    <div>
      {/* <Notification bannerObj={bannerObj} /> */}
      <Notification />
      <LoginForm
        user={user}
        setUser={setUser}
        // updateBanner={updateBanner}
      />
      <Blogs
        user={user}
        setUser={setUser}
        // updateBanner={updateBanner}
      />
    </div>
  )
}

export default App
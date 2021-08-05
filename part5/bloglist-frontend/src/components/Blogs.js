import React, { useRef } from 'react'
import Blog from './Blog'
import Logout from './Logout'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({ user, setUser, blogs, setBlogs, updateBanner }) => {
  const blogFormRef = useRef()
  
  if (!user) return <></>

  return (
    <>
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser} />

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog
          user={user}
          setBlogs={setBlogs}
          updateBanner={updateBanner}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default Blogs
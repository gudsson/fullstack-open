import React, { useRef, useState, useEffect } from 'react'
import blogsService from '../services/blogs'
import Blog from './Blog'
import Logout from './Logout'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({ user, setUser, updateBanner }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
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

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </>
  )
}

export default Blogs
// import React, { useRef, useState, useEffect } from 'react'
import React, { useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// import blogsService from '../services/blogs'
import Blog from './Blog'
import Logout from './Logout'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({ user, setUser }) => {
  // const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)


  if (!user) return <></>

  return (
    <div className='blogs'>
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser} />

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog
          user={user}
          // setBlogs={setBlogs}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      {/* {blogs.sort((a, b) => b.likes - a.likes).map(blog => */}
      {/* // {console.log(blogs)} */}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
        // <p key={blog.id}>{blog.title} {blog.author}</p>
        // <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default Blogs
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'


const Blogs = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)
  const token = useSelector(state => state.login.token)

  if (!token) return <></>

  return (
    <div className='blogs'>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog
          blogFormRef={blogFormRef}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
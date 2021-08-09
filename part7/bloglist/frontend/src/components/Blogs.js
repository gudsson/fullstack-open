import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Logout from './Logout'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({ user, setUser }) => {
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
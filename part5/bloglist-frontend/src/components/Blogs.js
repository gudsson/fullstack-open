import React from 'react'
import Blog from './Blog'
import Logout from './Logout'
import NewBlog from './NewBlog'

const Blogs = ({ user, setUser, blogs, setBlogs, updateBanner }) => {
  if (!user) return <></>

  return (
    <>
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser} />

      <h2>create new</h2>
      <NewBlog user={user} setBlogs={setBlogs} updateBanner={updateBanner} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default Blogs
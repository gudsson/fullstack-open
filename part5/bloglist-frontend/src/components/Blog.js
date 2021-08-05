import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = event => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    await blogsService.update(blog.id, { likes: blog.likes + 1 })
    setBlogs(await blogsService.getAll())
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button><br />
      <span style={visible ? {} : {display: 'none'}}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}
      </span>
    </div>
  )
}

export default Blog
import React, { useState } from 'react'
// import usersService from '../services/users'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    // display: (visible ? '' : 'none')
  }

  const toggleVisibility = event => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button><br />
      <span style={visible ? {} : {display: 'none'}}>
        {blog.url}<br />
        likes {blog.likes} <button >like</button><br />
        {blog.user.name}
      </span>
    </div>
  )
}

export default Blog
import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { like, removeBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    await blogsService.update(blog.id, { likes: blog.likes + 1 })
    dispatch(like(blog.id))
    dispatch(setNotification(`added like to '${blog.title}' by ${blog.author}`, 'success', 5))
  }

  const removePost = async () => {
    const result = window.confirm(`remove blog '${blog.title}' by ${blog.author}`)
    if (result) {
      dispatch(removeBlog(blog))
    }
  }

  const showDetails = () => (
    <div>
      {blog.url}<br />
      likes <span className='likes'>{blog.likes}</span> <button className='like-btn' onClick={addLike}>like</button><br />
      {blog.user.name} <br />
      <button className='remove-btn' onClick={removePost}>remove</button>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='show-btn' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button><br />
      {visible && showDetails()}
    </div>
  )
}

export default Blog
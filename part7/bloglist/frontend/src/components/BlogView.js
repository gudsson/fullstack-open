import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import blogsService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { like } from '../reducers/blogsReducer'

const BlogView = () => {
  const blogId = useParams().id
  const blog = useSelector(state => {
    return state.blogs.filter(blog => blog.id === blogId)[0]
  })
  const dispatch = useDispatch()


  console.log(blog)

  const addLike = async () => {
    await blogsService.update(blog.id, { likes: blog.likes + 1 })
    dispatch(like(blog.id))
    dispatch(setNotification(`added like to '${blog.title}' by ${blog.author}`, 'success', 5))
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <p>{blog.likes} likes <button className='like-btn' onClick={addLike}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogView
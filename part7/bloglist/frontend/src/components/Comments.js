import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const Comments = () => {
  const dispatch = useDispatch()
  const [commentText, setComment] = useState('')

  const blogId = useParams().id
  const user = useSelector(state => state.login)
  const comments = useSelector(state => {
    return state.blogs.find(blog => blog.id === blogId).comments
  })

  console.log(comments)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const commentObj = {
      content: commentText,
      user: user.username,
      blogId
    }

    dispatch(addComment(commentObj))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          name='comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button id="submit-btn" type="submit">add comment</button>
      </form>
      {(comments.length === 0) && <p>This blog has no comments.</p>}
      <ul>
        {comments.map((comment, idx) =>
          <li key={idx}>{console.log(comment)}{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments
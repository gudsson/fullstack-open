import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const Comments = () => {
  const blogId = useParams().id
  const comments = useSelector(state => {
    return state.blogs.find(blog => blog.id === blogId).comments
  })

  return (
    <div>
      <h3>comments</h3>
      {(comments.length === 0) && <p>This blog has no comments.</p>}
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments
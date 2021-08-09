import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import usersService from '../services/users'

const User = () => {
  const userId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const userBlogs = blogs.filter(blog => blog.user.id === userId)

  const displayBlogs = () => (
    <>
      <h2>{userBlogs[0].user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </>
  )

  const displayNoBlogs = () => {
    const user = usersService.getUser(userId)

    return (
      <>
        <h2>{user.name}</h2>
        <h3>user has no blogs</h3>
      </>
    )
  }


  return (
    <div>
      {userBlogs[0] ? displayBlogs() : displayNoBlogs()}
    </div>
  )
}

export default User
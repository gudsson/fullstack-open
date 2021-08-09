import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const token = useSelector(state => state.login.token)

  const blogCount = (name) => {
    return blogs.reduce((acc, blog) => {
      if (blog.user.name === name) return acc + 1
      return acc
    }, 0)
  }

  const tableData = blogs.reduce((acc, blog) => {
    if (acc.every(user => user.id !== blog.user.id)) {
      acc.push({
        name: blog.user.name,
        id: blog.user.id,
        blogCount: blogCount(blog.user.name)
      })
    }
    return acc
  }, [])

  if (!token) return <></>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(user => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
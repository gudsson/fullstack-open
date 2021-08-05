import React from 'react'

const Logout = ({ user, setUser }) => {
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <p>{user.name} <button onClick={logout}>logout</button></p>
  )
}

export default Logout
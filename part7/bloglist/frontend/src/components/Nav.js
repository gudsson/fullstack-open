import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

const navStyle = {
  padding: 5,
  margin: 2,
  backgroundColor: 'lightgray'
}

const Nav = () => {
  const token = useSelector(state => state.login.token)

  if (!token) return <></>

  return (
    <div style={navStyle}>
      <Link to={'/'}>blogs</Link>&nbsp;
      <Link to={'/users'}>users</Link>&nbsp;
      <Logout />
    </div>
  )
}

export default Nav
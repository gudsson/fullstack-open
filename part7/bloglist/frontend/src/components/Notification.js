import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    notification.msg && <div className={`notice ${notification.msgType}`}>
      {notification.msg}
    </div>
  )
}

export default Notification
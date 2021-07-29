import React from 'react'

const Notification = ({ noticeObj }) => {
  if (noticeObj === null) {
    return null
  }
  
  let { responseType, message } = noticeObj

  return (
    <div className={`notice ${responseType}`}>
      {message}
    </div>
  )
}

export default Notification
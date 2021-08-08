import React from 'react'

const Notification = ({ bannerObj }) => {
  if (bannerObj === null) {
    return null
  }

  const { response, message } = bannerObj

  return (
    <div className={`notice ${response}`}>
      {message}
    </div>
  )
}

export default Notification
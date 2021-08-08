import React from 'react'
import { useSelector } from 'react-redux'
// import { toggleImportanceOf } from '../reducers/notificationReducer'
// import { connect } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.msg)
  // if (bannerObj === null) {
  //   return null
  // }

  // const { response, message } = bannerObj

  return (
    // <div className={`notice ${response}`}>
    <div className={'notice'}>
      {notification}
    </div>
  )
}

export default Notification
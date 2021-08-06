const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET':
      return action.data
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const setNotification = (msg, timerId) => {
  // return (dispatch) => {
  //   dispatch({
  //     type: 'SET',
  //     data: msg
  //   })
  //   // setTimeout(() => {
  //   //   dispatch({
  //   //     type: 'REMOVE'
  //   //   })
  //   // }, seconds * 1000)
  // }
  // return {
  //   type: 'SET',
  //   data: msg
  // }

  return {
    type: 'SET',
    data: {
      msg,
      timerId
    }
  }
}

export default notificationReducer
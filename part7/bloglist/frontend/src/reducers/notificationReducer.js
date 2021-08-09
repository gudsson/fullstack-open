const initialState = {
  msg: '',
  msgType: null,
  timerId: null
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'SET_NOTICE':
    clearTimeout(state.timerId)
    return { ...action.data }
  case 'RECORD_TIMER':
    return { ...state, timerId: action.data }
  case 'REMOVE_NOTICE':
    return initialState
  default:
    return state
  }
}

export const setNotification = (msg, msgType, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTICE',
      data: {
        msg,
        msgType,
        timerId: null
      }
    })
    dispatch(recordTimer(setTimeout(() => dispatch(removeNotification()), seconds * 1000)))
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTICE'
  }
}

const recordTimer = (timerId) => {
  return {
    type: 'RECORD_TIMER',
    data: timerId
  }
}

export default notificationReducer
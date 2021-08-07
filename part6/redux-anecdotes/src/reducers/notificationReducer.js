const initialState = {
  msg: '',
  timerId: null
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTICE':
      clearTimeout(state.timerId)
      return { ...state, msg: action.data }
    case 'RECORD_TIMER':
      return { ...state, timerId: action.data }
    case 'REMOVE_NOTICE':
      return initialState
    default:
      return state
  }
}

export const setNotification = (msg) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTICE',
      data: msg
    })
    dispatch(recordTimer(setTimeout(() => dispatch(removeNotification()), 5000)))
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
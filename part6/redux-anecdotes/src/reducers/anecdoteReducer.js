import anecdoteService from "../services/anecdotes"
import { setNotification } from "./notificationReducer"

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INCREMENT_VOTES':
      const anecdoteIdx = state.findIndex(a => a.id === action.data.id)
      let newObject = {...state[anecdoteIdx], votes: state[anecdoteIdx].votes + 1}
      let newState = [...state]
      newState[anecdoteIdx] = newObject
      return newState.sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes.sort((a, b) => b.votes - a.votes)
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
    dispatch(setNotification(`added '${anecdote}'`))
  }
}

export const vote = (anecdote) => {
  // return {
  //   type: 'INCREMENT_VOTES',
  //   data: { id }
  // }
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'INCREMENT_VOTES',
      data: { id: anecdote.id }
    })
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
  }
}

export default anecdoteReducer
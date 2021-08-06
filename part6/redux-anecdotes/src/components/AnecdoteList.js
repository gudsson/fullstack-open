import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, recordTimer, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') return anecdotes
    return anecdotes.filter(anecdote => {
        const text = anecdote.content.toLowerCase()
        return text.includes(filter.toLowerCase())
      }
    )
  })
  
  const dispatch = useDispatch()

  const addVote = anecdote => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
    dispatch(recordTimer(setTimeout(() => dispatch(removeNotification()), 5000)))
  }
  
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList 
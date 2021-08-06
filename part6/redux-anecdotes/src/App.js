import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { filterChange } from './reducers/filterReducer'

const App = () => {
  const dispatch = useDispatch()

  const filterSelected = event => {
    console.log(event.target.value)
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
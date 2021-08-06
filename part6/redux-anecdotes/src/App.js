import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const filterSelected = event => {
    console.log(event.target.value)
  }
  return (
    <div>
      <Notification />
      <div>
        filter <input type="text" name="filter"
        onChange={filterSelected} />
      </div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
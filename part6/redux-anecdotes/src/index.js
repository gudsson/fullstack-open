import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteService from './services/ancedotes'
// import { initializeAnecdotes } from './reducers/anecdoteReducer'

// anecdoteService.getAll().then(anecdotes => {
//   anecdotes.forEach(anecdote => {
//     store.dispatch(initializeAnecdotes(anecdotes))
//   })
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayAnecdote = ({ anecdote, votes }) => {

  return (
    <>
      {anecdote}<br />
      has {votes} votes<br />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  let firstPlaceIdx = votes.indexOf(Math.max(...votes));

  const incrementVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1
    setVotes(votesCopy);
  }

  const getNextAnecdote = () => {
    let randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text='vote' handleClick={() => incrementVote()} />
      <Button text='next anecdote' handleClick={() => getNextAnecdote()} />
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdote={anecdotes[firstPlaceIdx]} votes={votes[firstPlaceIdx]} />
    </div>
  )
}

export default App
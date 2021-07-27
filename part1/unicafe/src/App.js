import React, { useState } from 'react'

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  let { good, neutral, bad, total } = props.values;

  if (total === 0) return <p>No feedback given</p>

  return (
    <>
      <Title title='statistics' />
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='average' value={((good - bad) / total).toFixed(1)} />
          <Statistic text='positive' value={`${(100 * good / total).toFixed(1)} %`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const values = { good, neutral, bad };
  values.total = Object.values(values).reduce((a, c) => a + c);

  return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='neutral' />
      <Statistics values={values} />
    </div>
  )
}

export default App
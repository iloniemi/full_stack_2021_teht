import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={increaseGood}/>
      <Button text='neutral' handleClick={increaseNeutral} />
      <Button text='bad' handleClick={increaseBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const votes = good + neutral + bad

  //Mikali ei viela palautetta
  if (votes === 0 ) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / votes
  const positive = good / votes * 100 + ' %'

  return <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good}/>
          <StatisticsLine text='neutral' value={neutral}/>
          <StatisticsLine text='bad' value={bad}/>
          <StatisticsLine text='average' value={average}/>
          <StatisticsLine text='positive' value={positive}/>
        </tbody>
      </table>
    </div>
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

export default App
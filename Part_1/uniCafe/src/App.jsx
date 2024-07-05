import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {

  return <tr><td>{text}</td> <td>{value}</td></tr>
}

const Statistics = ({ good, bad, neutral, total }) => {

  const clacAverage = () => {
    return parseFloat((good - bad) / total).toFixed(2)
  }
  const positiveVotes = () => {
    const ratioPercent = ((good / (bad + total)) * 100)
    return Math.round(String(ratioPercent)) + "%"
  }

  if (total === 0) {
    return <p><strong>No feedback yet :'(</strong></p>
  }


  return (
    <div>
      <h2>Others feedback:</h2>
      <table>
        <StatisticLine text="Good:" value={good} />
        <StatisticLine text="Bad:" value={bad} />
        <StatisticLine text="Neutral:" value={neutral} />
        <StatisticLine text="Average score:" value={clacAverage()} />
        <StatisticLine text="Number of votes:" value={total} />
        <StatisticLine text="Ratio of positive votes:" value={positiveVotes()} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(total + 1)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(total + 1)

  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>Give Feedback!</h1>
      <p><Button text="Good" onClick={handleGoodClick} /> <Button text="Bad" onClick={handleBadClick} /> <Button text="Neutral" onClick={handleNeutralClick} /></p>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App
import { useState } from "react"

const Header = ({ header }) => {
  console.log(header)
  return (
    <div>
      {header}
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  console.log(handleClick, text)
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
    <div>
      {props.text} {props.value} {props.operator}
    </div>
  )

}

const Statistics = ({ good, neutral, bad }) => {

  const pos = good * 1
  const neg = bad * -1
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <StatisticLine text='No feedback given' />

    )
  }
  return (
    <>
      <StatisticLine text='Good' value={good} />
      <StatisticLine text='Neutral' value={neutral} />
      <StatisticLine text='Bad' value={bad} />
      <StatisticLine text='All' value={all} />
      <StatisticLine text='Average' value={(pos + neg) / all} />
      <StatisticLine text='Positive' value={good / all * 100} operator='%' />
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)

  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={<h1>Give feedback</h1>} />

      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <Header header={<h2>Statistics</h2>} />

      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App

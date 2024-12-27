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

const Statistics = ({ good, neutral, bad }) => {
  console.log(good, neutral, bad)

  const pos = good * 1
  const neg = bad * -1
  const all = good + neutral + bad

  return (
    <div>
      <p>Good {good}
        <br />
        Neutral {neutral}
        <br />
        Bad {bad}
        <br />
        <br />
        All {all}
        <br />
        Average {(pos + neg) / all}
        <br />
        Positive {good / all * 100} %
      </p>
    </div>
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

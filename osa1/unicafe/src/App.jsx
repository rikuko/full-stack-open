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
  const average = ((pos + neg) / all).toFixed(1)
  const positive = (good / all * 100).toFixed(1)

  if (all === 0) {
    return (
      <Header header={<p>No feedback given</p>} />

    )
  }

  return (
    <table>
      <th>
        <Header header={<h2>Statistics</h2>} />
      </th>
      <tr>
        <td><StatisticLine text='Good' /></td>
        <td><StatisticLine value={good} /></td>
      </tr>
      <tr>
        <td><StatisticLine text='Neutral' /></td>
        <td><StatisticLine value={neutral} /></td>
      </tr>
      <tr>
        <td><StatisticLine text='Bad' /></td>
        <td><StatisticLine value={bad} /></td>
      </tr>
      <br />
      <tr>
        <td><StatisticLine text='All' /></td>
        <td><StatisticLine value={all} /></td>
      </tr>
      <tr>
        <td><StatisticLine text='Average' /></td>
        <td><StatisticLine value={average} /></td>
      </tr>
      <tr>
        <td><StatisticLine text='Positive' /></td>
        <td><StatisticLine value={positive} operator='%' /></td>
      </tr>
    </table>
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



      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App

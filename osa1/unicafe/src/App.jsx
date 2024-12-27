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

const Display = (props) => {
  console.log(props)

  const pos = props.value[0] * 1
  const neg = props.value[2] * -1

  return (
    <div>
      <p>Good {props.value[0]}
        <br />
        Neutral {props.value[1]}
        <br />
        Bad {props.value[2]}
        <br />
        <br />
        All {props.value[3]}
        <br />
        Average {(pos + neg) / props.value[3]}
        <br />
        Positive {props.value[0] / props.value[3] * 100} %
      </p>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllClicks(allClicks + 1)

  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllClicks(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAllClicks(allClicks + 1)
  }

  return (
    <div>
      <Header header={<h1>Give feedback</h1>} />

      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <Header header={<h2>Statistics</h2>} />

      <Display value={[good, neutral, bad, allClicks]} />


    </div>
  )
}

export default App

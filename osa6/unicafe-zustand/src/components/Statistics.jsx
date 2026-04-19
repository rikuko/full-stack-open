import { useCounter } from '../store'

const Statistics = () => {
  const { good, neutral, bad } = useCounter()
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <h2>no feedback given</h2>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{ good }</td></tr>
          <tr><td>neutral</td><td>{ neutral }</td></tr>
          <tr><td>bad</td><td>{ bad }</td></tr>

          <tr><td>all</td><td>{ all }</td></tr>

          <tr><td>average</td><td>{ average }</td></tr>
          <tr><td>positive</td><td>{ positive }%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics

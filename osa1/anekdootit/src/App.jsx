import { useState } from 'react'


const Button = (props) => {
  console.log('Button function ', props.handleClick)
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}

const Display = ({ text, vote }) => {
  return (
    <div>
      <p><strong>{text}</strong></p>
      <p>This anecdote has {vote} votes</p>
    </div>
  )
}

const Sorter = ({ votes, anecdotes }) => {
  console.log('Vote list: ', votes)
  let mostLiked = Math.max(...votes);
  console.log(votes.indexOf(mostLiked))
  let index = votes.indexOf(mostLiked)
  let anecdote = anecdotes[index]

  return (
    <>
      <h3>Anecdote with most votes</h3>
      <strong>{anecdote}</strong>
      <p>This anecdote has {mostLiked} votes</p>
    </>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [anecdote, setAnecdote] = useState('')
  const [vote, setVote] = useState(0)

  const setRandomNbr = () => {
    setSelected(Math.floor(Math.random() * 8))
    setAnecdote(anecdotes[selected])
  }

  const setVoteToAnecdote = () => {
    const points = votes
    points[selected] += 1
    setVotes(points)
    setVote(votes[selected])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button handleClick={setRandomNbr} text='Show anecdote' />
      <Display text={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={setVoteToAnecdote} text='Vote' />
      <Sorter votes={votes} anecdotes={anecdotes} />

    </div>
  )
}

export default App
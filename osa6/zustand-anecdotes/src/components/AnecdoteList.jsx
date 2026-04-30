import { useAnecdotes, useAnecdoteActions, useFilter } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  const filteredAnecdotes = anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  const { voteAnecdote }  = useAnecdoteActions()

  return(
    <div>
      { filteredAnecdotes.map(anecdote => (
        <div key = { anecdote.id }>
          <div>{ anecdote.content }</div>
          <div>
            has { anecdote.votes }
            <button onClick = { () => voteAnecdote(anecdote.id) }>vote</button>
          </div>
        </div>
      )) }
    </div>
  )
}

export default AnecdoteList
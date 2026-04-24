
import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { voteAnecdote, addAnecdote } = useAnecdoteActions()

  const vote = id => {
    console.log('vote', id)
    voteAnecdote(id)
  }

  const newAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.reset()
    console.log('Content ', content)

    if (content)
      return addAnecdote(content)

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      { anecdotes.map(anecdote => (
        <div key = { anecdote.id }>
          <div>{ anecdote.content }</div>
          <div>
            has { anecdote.votes }
            <button onClick = { () => vote(anecdote.id) }>vote</button>
          </div>
        </div>
      )) }
      <h2>create new</h2>
      <form onSubmit = { newAnecdote }>
        <div>
          <input name = 'newAnecdote'/>
        </div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default App
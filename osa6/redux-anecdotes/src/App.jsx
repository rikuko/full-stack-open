import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [ ...state ].sort((a, b) => b.votes -a.votes))

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
  }

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))   
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
      <form onSubmit = { addAnecdote }>
        <div>
          <input name = 'anecdote'/>
        </div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default App
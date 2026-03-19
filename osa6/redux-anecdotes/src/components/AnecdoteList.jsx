import { useDispatch, useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {
    return [ ...state.anecdotes ]
      .filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => b.votes -a.votes)
  })

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))   
  }

  return (
    <div>
      { anecdotes.map(anecdote => (
        <div key = { anecdote.id }>
          <div>{ anecdote.content }</div>
          <div>
            has { anecdote.votes }
            <button onClick = { () => vote(anecdote.id) }>vote</button>
          </div>
        </div>
      )) 
      }
    </div>
  )
}
export default AnecdoteList
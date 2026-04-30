import { useAnecdoteActions } from '../store'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const {  addAnecdote } = useAnecdoteActions()

  const newAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.reset()

    if (content){
      const newContent = await anecdoteService.create(content)
      return addAnecdote(newContent)
    }
  }

  return (
    <div>
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

export default AnecdoteForm
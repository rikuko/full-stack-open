import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const {  addAnecdote } = useAnecdoteActions()

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
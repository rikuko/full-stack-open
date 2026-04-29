import { useEffect } from 'react'

import anecdoteService from './services/anecdotes'
import { useAnecdoteActions } from './store'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm '
import Filter from './components/Filter'

const App = () => {
  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => initialize(anecdotes))
  }, [ initialize ])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
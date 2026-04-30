import { create } from 'zustand'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    voteAnecdote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? { ...a, votes: a.votes + 1 } : a )
      })
    ),
    addAnecdote: content => set(
      state => ({ anecdotes: [ ...state.anecdotes, content ] })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize: anecdotes => set(() => ({ anecdotes }))
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

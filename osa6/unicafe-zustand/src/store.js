import { create } from 'zustand'

export const useCounterStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    good: () => set(state => ({ good: state.good + 1 })),
    neutral: () => set(state => ({ neutral: state.neutral + 1 })),
    bad: () => set(state => ({ bad: state.bad + 1 }))
  }
}))

export const useCounter = () => useCounterStore(state => state)
export const useCounterButtons = () => useCounterStore(state => state.actions)
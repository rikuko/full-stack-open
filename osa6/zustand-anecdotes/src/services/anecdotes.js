const baseUrl = 'http://localhost:3001/anecdotes'

// GET all
const getAll = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok) {
    throw new Error('Failed to get anecdotes')
  }

  return await res.json()
}

// ADD new
const create = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }

  const res = await fetch(baseUrl, options)

  if (!res.ok) {
    throw new Error('Failed to add new anecdote')
  }

  return await res.json()
}

export default { getAll, create }
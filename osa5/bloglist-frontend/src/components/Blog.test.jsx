import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const user = {
  username: 'testuser',
  name: 'Test User'
}

const blog = {
  title: 'Testi blogi',
  author: 'Testaaja',
  url: 'www.testi.fi',
  likes: 3,
  user: user
}

test('Renderöi blogin nimen', () => {
  render(<Blog blog = { blog } />)
  const element = screen.getByText(/Testi blogi/)
  expect(element).toBeDefined()
})

test('Renderöi blogin authorin', () => {
  render(<Blog blog = { blog } />)
  const element = screen.getByText(/Testaaja/)
  expect(element).toBeDefined()
})

test('Renderöi blogin URLn jos kaikki blogin tiedot on klikattu näkyviin', async () => {
  render(<Blog blog = { blog } />)
  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  const element = screen.getByText(/www.testi.fi/i)
  expect(element).toBeDefined()
})

test('Lisää kutsuu tapahtumakäsittelijää kahdesti kun like-nappia painetaan kahdesti', async () => {

  const mockUpdate = vi.fn()

  render(<Blog blog = { blog } updateBlog = { mockUpdate } />)

  const user = userEvent.setup()
  const showButton = screen.getByText('Show')
  await user.click(showButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockUpdate).toBeCalledTimes(2)
})




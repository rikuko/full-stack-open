import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'testuser',
  name:'Test User'
}

const blog = {
  title: 'Testi blogi',
  author: 'Testaaja',
  url: 'www.testi.fi',
  likes: 3,
  user: user
}

test('Renderöi blogin nimen', () => {
  render(<Blog blog={ blog } />)
  const element = screen.getByText(/Testi blogi/)
  expect(element).toBeDefined()
})

test('Renderöi blogin authorin', () => {
  render(<Blog blog={ blog } />)
  const element = screen.getByText(/Testaaja/)
  expect(element).toBeDefined()
})




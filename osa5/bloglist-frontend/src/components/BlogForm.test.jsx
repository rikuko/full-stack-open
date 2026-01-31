import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { useState } from 'react'

const TestCreateNewBlog= ({ createBlog }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
  }

  return (
    <BlogForm
      handleSubmit = { handleSubmit }
      handleTitle = { ({ target }) => setTitle(target.value) }
      handleAuthor = { ({ target }) => setAuthor(target.value) }
      handleUrl = { ({ target }) => setUrl(target.value) }
      title = { title }
      author = { author }
      url = { url }
    />
  )
}

test('<BlogForm /> kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla kun blogi luodaan', async () => {

  const newBlog = vi.fn()
  const user = userEvent.setup()

  render(<TestCreateNewBlog createBlog = { newBlog } />)

  await user.type(screen.getByPlaceholderText('title'), 'Testiblogi')
  await user.type(screen.getByPlaceholderText('author'), 'Tero Testaaja')
  await user.type(screen.getByPlaceholderText('url'), 'www.testi.fi')

  await user.click(screen.getByText('Save'))

  console.log('New blog: ', newBlog.mock.calls)

  expect(newBlog).toHaveBeenCalledTimes(1)
  expect(newBlog).toHaveBeenCalledWith({
    title: 'Testiblogi',
    author: 'Tero Testaaja',
    url: 'www.testi.fi'
  })
})

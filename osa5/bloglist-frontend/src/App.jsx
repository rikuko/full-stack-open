import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Logging credentials: ', username, password)
  }

// ! TODO: Logiikan lisääminen kirjautumislomakkeelle 

  return (
    <div>

      <h2>Login</h2>
      <form onSubmit={{ handleLogin }}>
        <div>
          <label>
            Username
            <input
              type='text'
              value={username}
              onChange={({ target }) =>
                setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={({ target }) =>
                setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Logging credentials: ', username, password)
    } catch {
      console.log('Wrong credentials: ', username, password)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h4>Your are logged in as {user.name}</h4>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div >
  )
}

export default App
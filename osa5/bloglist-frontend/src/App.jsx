import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
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

  useEffect(() => {
    const userJSON =
      window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      console.log('Token: ', user.token)
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
        <form>
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
          <Button click={handleLogin} text='Login' />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h4>
        Your are logged in as {user.name}</h4>
      <div>
        <Button click={handleLogout} text='Logout' />
        <p></p>
      </div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div >
  )
}

export default App
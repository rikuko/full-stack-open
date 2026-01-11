import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import './css/main.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


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

  const addNewBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    blogService.create(newBlog).then(returned => {
      setBlogs(blogs.concat(returned))
      setNewBlog('')
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`New blog, ${newBlog.title} by ${newBlog.author} saved`)
      setTimeout(() => {
        setMessage(null)
      }, 6000)
    })
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setLoginVisible(false)
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
      setMessage(`Login successful as ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch {
      console.log('Wrong credentials')
      setUsername('')
      setPassword('')
      setErrorMessage('Wrong username and/or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    const hideLoginForm = { display: loginVisible ? 'none' : '' }
    const showLoginForm = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideLoginForm}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div>
          <div style={showLoginForm}>
            <Login
              username={username}
              password={password}
              handleUsername={({ target }) => setUsername(target.value)}
              handlePassword={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
          handleSubmit={addNewBlog}
        />
      </div>
    )
  }

  /*
    if (user === null) {
      return (
        
              <div>
                <h2>Login</h2>
                <Notification message={message} errorMessage={errorMessage} />
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
    */

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <h4>
            Your are logged in as {user.name}</h4>
            {blogForm}
          <div>

            <Button click={handleLogout} text='Logout' />
            <p></p>
          </div>

          {/*
          <div>
            <h3>Create new entry</h3>
            <form>
              <div>
                <label>
                  Title:
                  <input
                    type='text'
                    value={title}
                    onChange={({ target }) =>
                      setTitle(target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Author:
                  <input
                    type='text'
                    value={author}
                    onChange={({ target }) =>
                      setAuthor(target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Url:
                  <input
                    type='text'
                    value={url}
                    onChange={({ target }) =>
                      setUrl(target.value)}
                  />
                </label>
              </div>
              <p></p>
              <Button click={addNewBlog} text='Save' />
              <p></p>
            </form>
          </div>
*/}

          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      )}
    </div >
  )
}

export default App
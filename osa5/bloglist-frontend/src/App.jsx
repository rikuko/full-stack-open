import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Reusable from './components/Reusable'

import blogService from './services/blogs'
import loginService from './services/login'

import './css/main.css'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ message, setMessage ] = useState('')

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
      const blogWithUser = {
        ...returned,
        user: user
      }
      setBlogs(blogs.concat(blogWithUser))
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

  const updateBlog = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)

    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id
    }
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog)
    )
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title}, by ${blog.author}?`)

    if (!ok) return
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

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
    return (
      <Reusable buttonLabel = 'Login'>
        <Login
          username = { username }
          password = { password }
          handleUsername = { ({ target }) => setUsername(target.value) }
          handlePassword = { ({ target }) => setPassword(target.value) }
          handleSubmit = { handleLogin }
        />
      </Reusable>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm
          title = { title }
          author = { author }
          url = { url }
          handleTitle = { ({ target }) => setTitle(target.value) }
          handleAuthor = { ({ target }) => setAuthor(target.value) }
          handleUrl = { ({ target }) => setUrl(target.value) }
          handleSubmit = { addNewBlog }
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message = { message } errorMessage = { errorMessage } />

      { !user && loginForm() }
      { user && (
        <div>
          <h4>
            Your are logged in as { user.name }
          </h4> <Button click = { handleLogout } text = 'Logout' />
          { blogForm() }
          {
            [ ...blogs ]
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key = { blog.id }
                  blog = { blog }
                  updateBlog = { () => updateBlog(blog.id) }
                  removeBlog = { () => removeBlog(blog) }
                  user = { user }
                />
              )
          }
        </div>
      ) }
    </div >
  )
}

export default App
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// POST new blog
blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  if (!body.title) {
    return response.status(400).json({
      error: 'Title is required'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'URL is required'
    })
  } else {
    blog
      .save()
      .then(result => {
        response.json(result)
      })
      .catch(error => next(error))
  }
})

// DELETE blog by ID
blogsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Blog
    .findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Blog not found' })
      }
    })
    .catch(error => next(error))
})

// UPDATE blog by ID
blogsRouter.put('/:id', (request, response, next) => {
  const { author, title, url, likes } = request.body

  Blog
    .findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
      }
      blog.author = author
      blog.title = title
      blog.url = url
      blog.likes = likes

      return blog.save()
        .then((updatedBlog) => {
          response.json(updatedBlog)
        })
    })
    .catch(error => {
      console.error('Error updating blog:', error)
      next(error)
    })
})

module.exports = blogsRouter
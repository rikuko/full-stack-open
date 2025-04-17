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

module.exports = blogsRouter
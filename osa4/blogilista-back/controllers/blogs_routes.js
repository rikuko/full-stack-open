const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

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
  } else{
    blog
      .save()
      .then(result => {
        response.json(result)
      })
      .catch(error => next(error))
  }
})

module.exports = blogsRouter
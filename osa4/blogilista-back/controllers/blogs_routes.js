const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// GET all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

//TODOtehtävä 4.20* ei ole vielä valmis. Token ei siirry oikein auth.headeriin
// POST new blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('Decoded token: ', decodedToken)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token is invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({
            error: 'User not found'
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
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

        const newBlog = await blog.save()
        user.blogs = user.blogs.concat(newBlog._id)
        await user.save()
        response.status(201).json(newBlog)
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
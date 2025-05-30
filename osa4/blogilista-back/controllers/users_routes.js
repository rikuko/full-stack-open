const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// POST new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    console.log('Request body: ', request.body)

    const usersInDb = await User.find({})
    const existingUser = usersInDb.map(user => user.username)
    console.log('User in db ', usersInDb)
    console.log('Existing user: ', existingUser)


    if (!password || !username) {
        return response.status(400).json({
            error: 'Username and password are required'
        })
    }
    if (password.length < 3) {
        return response.status(400).json({
            error: 'Password must be at least 3 characters long'
        })
    }
    if (username.length < 3) {
        return response.status(400).json({
            error: 'Username must be at least 3 characters long'
        })
    } else {
        const salt = 10
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()

        response.status(201).json(savedUser)
    }
})


//GET all users
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })

    response.json(users)
})

module.exports = usersRouter
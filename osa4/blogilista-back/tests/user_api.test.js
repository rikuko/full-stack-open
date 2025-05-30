const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const testData = require('./test_data')
const User = require('../models/user')

// Testikomennot:
// npm run test -- --test-concurrency=1 => testaa kaikki testit
// npm run test -- --test-only => testaa yksittäisen test.only-testin

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({
        username: 'system',
        name: 'System Admin',
        passwordHash
    })

    await user.save()
})

// Tests for user creation
describe('tests for user', () => {

    test('create new user', async () => {
        const usersAtStart = await User.find({})
        console.log('Users at start ', usersAtStart)

        await api
            .post('/api/users')
            .send(testData.newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        console.log('DB content after post one more: ', usersAtEnd)

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(testData.newUser.username))
    })

    test('Create user without password', async () => {
        const usersAtStart = await User.find({})

        const result = await api
            .post('/api/users')
            .send(testData.userWithoutPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Username and password are required')

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Create user without username', async () => {
        const usersAtStart = await User.find({})

        const result = await api
            .post('/api/users')
            .send(testData.userWithoutUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Username and password are required')

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Create user with too short password', async () => {
        const usersAtStart = await User.find({})

        const result = await api
            .post('/api/users')
            .send(testData.userWithShortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Password must be at least 3 characters long')

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Create user with too short username', async () => {
        const usersAtStart = await User.find({})

        const result = await api
            .post('/api/users')
            .send(testData.userWithShortUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        console.log('Result error: ', result.body.error)
        assert.strictEqual(result.body.error, 'Username must be at least 3 characters long')

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Create user with existing username', async () => {
        const usersAtStart = await User.find({})
        console.log('Users at start: ', usersAtStart)
        console.log('Test data: ', testData.userWithExistingUsername)

        const result = await api
            .post('/api/users')
            .send(testData.userWithExistingUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log('Result error: ', result.error)
        console.log('Http-status: ', result.statusCode)

        assert.strictEqual(result.body.error.includes, 'Username must be unique')


        const usersAtEnd = await User.find({})
        console.log('Users at end: ', usersAtEnd)

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })
})

// Close DB connection
after(async () => {
    await mongoose.connection.close()
    console.log('Connection to DB closed')
})

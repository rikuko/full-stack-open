const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

// Testikomennot:
// npm run test -- --test-concurrency=1 => testaa kaikki testit
// npm run test -- --test-only => testaa yksittäisen test.only-testin

describe('Tests for login', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salainen', 10)
        const user = new User({
            username: 'tero',
            name: 'Tero Testaaja',
            passwordHash
        })

        await user.save()
    })

    test('Login with incorrect password', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: 'tero',
                password: 'erittäinensalainen'
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Invalid username or password')
    })

    test('Login with empty username', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: '',
                password: 'salainen'
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Invalid username or password')
    })

    test('Login with correct credentials', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: 'tero',
                password: 'salainen'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.ok(result.body.token)
        assert.strictEqual(result.body.username, 'tero')
        assert.strictEqual(result.body.name, 'Tero Testaaja')
    })

    test('Login with incorrect username', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: 'pasi',
                password: 'salainen'
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Invalid username or password')
    })

    test('Login with empty password', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: 'tero',
                password: ''
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Invalid username or password')
    })

    test('Login with empty username and password', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: '',
                password: ''
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'Invalid username or password')
    })

})

// Close DB connection
after(async () => {
    await mongoose.connection.close()
    console.log('Connection to DB closed')
})
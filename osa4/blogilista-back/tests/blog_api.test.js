const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testData = require('./test_data')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Testikomennot:
// npm run test -- --test-concurrency=1 => testaa kaikki testit
// npm run test -- --test-only => testaa yksittäisen test.only-testin


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testData.blogs)

    await api
        .post('/api/login')
        .send({
            username: 'system',
            password: 'salainen'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const user = await User.findOne({ username: 'system' })

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    testData.token = token
})

//Tests for GET-method API
describe('GET-method API tests', () => {

    test('all blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    console.log('Response GET all ', app.response.body)

    test('Four blogs in list', async () => {
        const response = await api.get('/api/blogs')
        console.log('Blogs in DB: ', response.body)
        assert.strictEqual(response.body.length, 4)
    })

    test('Not three blog in list', async () => {
        const response = await api.get('/api/blogs')
        assert.notEqual(response.body.length, 3)
    })

    test('Not 5 blog in list', async () => {
        const response = await api.get('/api/blogs')
        assert.notEqual(response.body.length, 5)
    })

    test('returned object id-field is named id', async () => {
        const response = await api.get('/api/blogs')
        console.log('Response: ', response.body[0])
        assert.ok('id' in response.body[0])
        assert.ok(!('_id' in response.body[0]))
    })
})

// Tests for POST-method API
describe('POST-method API tests', () => {
    console.log('Blog-list size in DB before POST-tests:', testData.blogs.length)

    test('POST new blog with token', async () => {
        // Add a new blog
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testData.token}`)
            .send(testData.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        console.log('Blog-list size after adding new ', response.body.length)
        console.log('Blog-list content after POST-request ', response.body)

        assert.strictEqual(response.body.length, testData.blogs.length + 1)
    })

    test('POST new blog without token', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', '')
            .send(testData.newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, testData.blogs.length)
    })

    test('POST new blog without likes', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testData.token}`)
            .send(testData.blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        // Check that only one blog was added
        assert.strictEqual(response.body.length, testData.blogs.length + 1)
    })

    test('POST new blog without title', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testData.token}`)
            .send(testData.blogWithoutTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        // Check that no blog was added
        assert.strictEqual(response.body.length, testData.blogs.length)
    })

    test('POST new blog without URL', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testData.token}`)
            .send(testData.blogWithoutUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        // Check that no blog was added
        assert.strictEqual(response.body.length, testData.blogs.length)
    })
})

// Tests for DELETE-method API
describe('DELETE-method API tests', () => {
    test('delete blog by id', async () => {
        // Add a new blog
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testData.token}`)
            .send(testData.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await api.get('/api/blogs')
        console.log('Blogs in DB before deleting one: ', blogsInDb.body.length)

        const blogToDelete = blogsInDb.body[blogsInDb.body.length - 1]
        console.log('Blog to be deleted: ', blogToDelete)

        await api
            .delete('/api/blogs/' + blogToDelete.id)
            .set('Authorization', `Bearer ${testData.token}`)
            .expect(204)

        const blogsAfterDelete = await api.get('/api/blogs')
        console.log('Blogs after delete: ', blogsAfterDelete.body)

        assert.strictEqual(blogsAfterDelete.body.length, blogsInDb.body.length - 1)
    })
})

// Tests for PUT-method API
describe('PUT-method tests', () => {
    test('update blog likes', async () => {

        const blogsInDb = await api.get('/api/blogs')
        console.log('Blogs in DB before updating one: ', blogsInDb.body.length)

        const blogToUpdate = blogsInDb.body[0]
        console.log('Blog to be updated: ', blogToUpdate)

        const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put('/api/blogs/' + blogToUpdate.id)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await api.get('/api/blogs')
        console.log('Blogs after update: ', blogsAfterUpdate.body)

        assert.strictEqual(blogsAfterUpdate.body.length, blogsInDb.body.length)
        assert.strictEqual(blogsAfterUpdate.body[0].likes, blogToUpdate.likes + 1)
    })
})


// Close DB connection
after(async () => {
    await mongoose.connection.close()
    console.log('Connection to DB closed')
})

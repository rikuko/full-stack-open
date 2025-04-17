const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testData = require('./test_data')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testData.blogs)
})

//Tests for GET-method API
describe('GET-method API tests', () => {

  test('all blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

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

  test('POST new blog', async () => {
    await api
      .post('/api/blogs')
      .send(testData.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log('Blog-list size after adding new ', response.body.length)
    console.log('Blog-list content after POST-request ', response.body)

    // Check that only one blog was added
    assert.strictEqual(response.body.length, testData.blogs.length + 1)
    assert.notEqual(response.body.length, testData.blogs.length + 2)
    assert.notEqual(response.body.length, testData.blogs.length)

    // Check that added blog content is correct
    assert.ok('id' in response.body[4])
    assert.ok('title' in response.body[4])
    assert.ok('author' in response.body[4])
    assert.ok('likes' in response.body[4])
    assert.ok('url' in response.body[4])
  })

  test('POST new blog without likes', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('POST new blog without title', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('POST new blog without URL', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

// Tests for DELETE-method API
describe('DELETE-method API tests', () => {
  test('delete blog by id', async () => {

    const blogsInDb = await api.get('/api/blogs')
    console.log('Blogs in DB before deleting one: ', blogsInDb.body.length)

    const blogToDelete = blogsInDb.body[0]
    console.log('Blog to be deleted: ', blogToDelete)

    await api
      .delete('/api/blogs/' + blogToDelete.id)
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

const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testData = require('./test_data')

// Tests for POST-method API
describe('POST-method API tests', () => {
  console.log('Blog-list size in DB ',testData.blogs.length)

  test('POST new blog', async () => {
    await api
      .post('/api/blogs')
      .send(testData.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log('Blog-list size after adding new ',response.body.length)
    console.log('Blog-list content after POST-request ',response.body)

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


  test.only('POST new blog without likes', async () => {
    await api
      .post('/api/blogs')
      .send(testData.blogWithoutLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
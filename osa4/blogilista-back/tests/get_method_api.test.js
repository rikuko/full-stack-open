const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET-method API tests', () => {

  test('all blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Two blogs in list', async () => {
    const response = await api.get('/api/blogs')
    console.log('Blogs in DB: ',response.body)
    assert.strictEqual(response.body.length, 2)
  })

  test('Not one blog in list', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body.length, 1)
  })

  test('Not three blog in list', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body.length, 3)
  })

  test('returned object id-field is named id', async () => {
    const response = await api.get('/api/blogs')
    console.log('Response: ',response.body)
    assert.ok('id' in response.body[0])
    assert.ok(!('_id' in response.body[0]))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
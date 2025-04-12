const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Blog API tests', () => {

  test.only('all blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  //TODO: Testi kuntoon .Tehtävä 4.8
  test.only('Two blogs in list', async () => {
    const response = await api.get('/api/blogs')
    console.log('Blogs in DB: ',response.body)
    assert.strictEqual(response.body.length, 2)
  })

  test.only('Not one blog in list', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body.length, 1)
  })

  test.only('Not three blog in list', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body.length, 3)
  })


  after(async () => {
    await mongoose.connection.close()
  })
})
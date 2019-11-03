const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are identified by the field id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined
})

test('post request works', async () => {
  let blogs = await api.get('/api/blogs')
  let len = blogs.body.length

  await api
    .post('/api/blogs')
    .send({
      'title': "haha",
      'author': "aha",
      'url': "google.com",
      'likes': '100'
    })
    .expect(201)

  let newBlogs = await api.get('/api/blogs')
  expect(newBlogs.body.length).toBe(len + 1)
})

test('likes will default to 0', async () => {
  await api
    .post('/api/blogs')
    .send({
      'title': "haha",
      'author': "aha",
      'url': "google.com"
    })
    .expect(201)

  let blogs = await api.get('/api/blogs')
  let lastBlog = blogs.body[blogs.body.length - 1]
  expect(lastBlog.likes).toBe(0)
})

test('if new blog doesnt contain title and url, return bad request', async () => {
  await api
    .post('/api/blogs', {
      author: "aha",
      likes: 1000
    })
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
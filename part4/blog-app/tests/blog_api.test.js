const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all ids are defined and unique', async () => {
  const blogs = await Blog.find({})
  const idArr = blogs.map(blog => blog.id)

  idArr.forEach(id => expect(id).toBeDefined())
  expect([...new Set(idArr)]).toHaveLength(idArr.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test title',
    author: 'author',
    url: 'www.test.com',
    likes: 10.2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(b => b.title)
  const author = blogsAtEnd.map(b => b.author)
  const url = blogsAtEnd.map(b => b.url)
  const likes = blogsAtEnd.map(b => b.likes)
  expect(title).toContain('test title')
  expect(author).toContain('author')
  expect(url).toContain('www.test.com')
  expect(likes).toContain(10.2)
})

afterAll(() => {
  mongoose.connection.close()
})
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

test('all blogs have a likes property', async () => {
  const blogs = await Blog.find({})
  const likesArr = blogs.map(blog => blog.likes)
  likesArr.forEach(likes => expect(likes).toBeDefined())
})

test('missing title returns 400 bad request', async () => {
  const newBlog = {
    author: 'author',
    url: 'www.test.com',
    likes: 10.2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('missing title returns 400 bad request', async () => {
  const newBlog = {
    title: 'test title',
    author: 'author',
    likes: 10.2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const blog = {
    likes: 99
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToUpdate.title)

  console.log(blogsAtEnd)
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
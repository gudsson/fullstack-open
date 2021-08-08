const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  await api.post('/api/users').send({
    username: 'root',
    name: 'root',
    password: 'password'
  })

  await api.post('/api/login').send({
    'username': 'root',
    'password': 'password'
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const user = await User.findOne({ username: 'root' })

  const blogObjects = helper.initialBlogs
    .map(blog => {
      let newBlog = new Blog(blog)
      newBlog.user = user.id
      return newBlog
    })
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
  const user = await User.findOne({ username: 'root' })
  const token = helper.logIn(user).token

  const newBlog = {
    author: 'author',
    url: 'www.test.com',
    likes: 10.2,
    user: user.id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('missing url returns 400 bad request', async () => {
  const user = await User.findOne({ username: 'root' })
  const token = helper.logIn(user).token

  const newBlog = {
    title: 'test title',
    author: 'author',
    likes: 10.2,
    user: user.id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const user = await User.findOne({ username: 'root' })
  const token = helper.logIn(user).token

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart.find(blog => {
    return blog.user.toString() === user._id.toString()
  })

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
})

test('a blog can be updated', async () => {
  const user = await User.findOne({ username: 'root' })
  const token = helper.logIn(user).token

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart.find(blog => {
    return blog.user.toString() === user._id.toString()
  })

  const blog = {
    title: 'new title',
    likes: 99
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', token)
    .send(blog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToUpdate.title)

  console.log(blogsAtEnd)
})

test('a valid blog can be added', async () => {
  const user = await User.findOne({ username: 'root' })
  const token = helper.logIn(user).token

  const newBlog = {
    title: 'test title',
    url: 'www.test.com',
    likes: 10.2
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
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
  expect(author).toContain(user.username)
  expect(url).toContain('www.test.com')
  expect(likes).toContain(10.2)
})

test('adding blog without token fails', async () => {
  const user = await User.findOne({ username: 'root' })

  const newBlog = {
    title: 'test title',
    url: 'www.test.com',
    user: user.id,
    likes: 10.2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
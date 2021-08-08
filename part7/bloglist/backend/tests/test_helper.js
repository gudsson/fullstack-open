const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    'title': 'test1',
    'author': 'root',
    'url': 'test.com/1',
    'likes': 10
  },
  {
    'title': 'test2',
    'author': 'root',
    'url': 'test.com/2',
    'likes': 10
  },
  {
    'title': 'test3',
    'author': 'root',
    'url': 'test.com/3',
  }
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: '-', url: '-', likes: '-' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const logIn = (user) => {
  const token = jwt.sign(user.toJSON(), process.env.SECRET)

  return Object.assign(user, { token: `bearer ${token}` })
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  logIn
}
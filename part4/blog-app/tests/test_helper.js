const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'test1',
    'author': 'Jay',
    'url': 'url',
    'likes': 10
  },
  {
    'title': 'test2',
    'author': 'Jay',
    'url': 'url',
    'likes': 10
  },
  {
    'title': 'test3',
    'author': 'Jay',
    'url': 'url'
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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
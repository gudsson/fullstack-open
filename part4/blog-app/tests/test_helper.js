const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Hello World',
    'author': 'Jay',
    'url': 'url',
    'likes': 10
  },
  {
    'title': 'Hello World',
    'author': 'Jay',
    'url': 'url',
    'likes': 10
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
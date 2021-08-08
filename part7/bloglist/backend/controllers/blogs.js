const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userVerification = async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
    return false
  }
  return await User.findById(decodedToken.id)
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1})

  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await userVerification(request, response)
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })

  const blog = new Blog({
    title: body.title,
    author: body.author === undefined ? user.username : body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = await userVerification(request, response)
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    console.log(response.data)
    return response.status(401).json({ error: 'session expired' })
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const user = await userVerification(request, response)
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
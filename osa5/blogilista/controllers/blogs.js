const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', { username: 1, name: 1})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const authorization = request.token
  const decodedToken = jwt.verify(authorization, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...request.body,
    user: user._id
  })

  try {
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
    } catch(exception) {
      response.status(400).end()
    }
  })

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(String(blog.user))
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken.id)
  if (decodedToken.id === String(blog.user)) {
    try {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch {
      response.status(400).end()
    }
  } else {
    response.status(400).json('error: no authorization')
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
} catch {
  response.status(400).end()
}
})

module.exports = blogsRouter
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogRouter.use(bodyParser.json())

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs.map(blog => blog.toJSON()))
});

blogRouter.post('', async (request, response) => {
  if (request.body.likes === undefined) {
    request.body.likes = 0
  }
  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).json({})
  } else {
    const body = request.body
    console.log(request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)    
    if (!request.token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: request.body.name,
      author: request.body.number,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
})

blogRouter.put('/:id', (req, res) => {
  const body = req.body

  const blog = {
    title: body.name,
    author: body.number,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON())
    })
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  console.log(request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)    
  if (!request.token || !decodedToken.id) {      
    return response.status(401).json({ error: 'token missing or invalid' })    
  }
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user.id.toString()) {
    Blog.remove(blog)
    response.status(204).end()
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter
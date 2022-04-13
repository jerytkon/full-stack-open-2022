const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 })

      response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  console.log('suorittaa post')
  const body = request.body
  /*
  const token = getTokenFrom(request)
  */
 try {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  if (!body.url || !body.title) {
    return response.status(400).json({ error: 'Url or Title missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
} catch (JsonWebTokenError) {return response.status(401).json({ error: 'token missing or invalid' })}
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    try 
    { const decodedToken = jwt.verify(request.token, process.env.SECRET) 
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    console.log(user)
    console.log(blog)
    if (blog)
     { 
       await Blog.findByIdAndRemove(request.params.id) 
       response.status(204).end()
      } else { 
        return response.status(401).json({ error: 'The user has no permission to delete this blog' })} } catch (JsonWebTokenError) {return response.status(401).json({ error: 'token missing or invalid' })}



  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    
    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    }
  
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
    } catch (JsonWebTokenError) {return response.status(401).json({ error: 'token missing or invalid' })}
  })

module.exports = blogsRouter
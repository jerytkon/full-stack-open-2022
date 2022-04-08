const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

const bcrypt = require('bcryptjs')
const api = supertest(app)
const User = require('../models/user')




const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    
    
  })


test('a valid blog can be added ', async () => {
    const username = 'root'
    const user = await User.findOne({ username })



    const userForToken = {
        username: user.username,
        id: user._id,
      }
        
    const token = jwt.sign(userForToken, process.env.SECRET)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const newBlog = {
      title: 'String',
      author: 'String',
      url: 'String',
      likes: 2
    }

  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'String'
    )
  })
})
afterAll(() => {
  mongoose.connection.close()
})
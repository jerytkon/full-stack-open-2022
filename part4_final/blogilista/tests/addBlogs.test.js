/*
Tee SuperTest-kirjastolla testit blogilistan osoitteeseen
 /api/blogs tapahtuvalle HTTP GET -pyynnölle. 
 Testaa, että sovellus palauttaa oikean määrän 
 JSON-muotoisia blogeja.
Kun testi on valmis, refaktoroi operaatio käyttämään
 promisejen sijaan async/awaitia.
Huomaa, että joudut tekemään koodiin materiaalin
 tapaan hieman muutoksia 
 (mm. testausympäristön määrittely), 
 jotta saat järkevästi tehtyä omaa tietokantaa 
 käyttäviä API-tason testejä.
*/

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

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

test('id exists, not _id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
  
    expect(response.body[0].id).toBeDefined()
  })


test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'String',
      author: 'String',
      url: 'String',
      likes: 2
    }

    const username = 'root'
    const user = await User.findOne({ username })



    const userForToken = {
        username: user.username,
        id: user._id,
      }
        
    const token = jwt.sign(userForToken, process.env.SECRET)
  
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

  test('an unvalid blog will not be added ', async () => {
    const newBlog = {
      title: 'Should not be added',
      likes: 2
    }

    const username = 'root'
    const user = await User.findOne({ username })



    const userForToken = {
        username: user.username,
        id: user._id,
      }
        
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': `bearer ${token}` })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)

  })

  test('last id is deleted ', async () => {
    const blogsIndex = await blogsInDB()
    const blogToDelete= blogsIndex[blogsIndex.length - 1]

    const username = 'root'
    const user = await User.findOne({ username })



    const userForToken = {
        username: user.username,
        id: user._id,
      }
        
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ 'Authorization': `bearer ${token}` })
      .expect(204)
      .catch(error => next(error))
  })

// test that likes will be 0 if not defined
test('likes is zero if not defined', async () => {
  const newBlog = {
    title: 'Likes0',
    author: 'String',
    url: 'String'
  }

  const username = 'root'
  const user = await User.findOne({ username })



  const userForToken = {
      username: user.username,
      id: user._id,
    }
      
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ 'Authorization': `bearer ${token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(r => r)
    console.log(blogs[2].likes)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs[2].likes).toBe(0)
})
// test that likes can be modified
test('likes is different from the beginning', async () => {

  const newBlogTitle = 'Likes0'
  const username = 'root'
  const user = await User.findOne({ username })
  const blogtochange = await Blog.findOne({ newBlogTitle })
  const newBlog = {...blogtochange._doc, likes: blogtochange.likes + 5 }
  console.log(blogtochange)
  console.log(newBlog)



  const userForToken = {
      username: user.username,
      id: user._id,
    }
      
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .put(`/api/blogs/${blogtochange.id}`)
    .send(newBlog)
    .set({ 'Authorization': `bearer ${token}` })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log(response.body[0])

  expect(response.body[0].likes).toBe(6)
})
})
afterAll(() => {
  mongoose.connection.close()
})
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

const api = supertest(app)


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })


test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'String',
      author: 'String',
      url: 'String',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'String'
    )
  })

  test('last id is deleted ', async () => {
    const blogsIndex = await blogsInDB()
    const blogToDelete= blogsIndex[blogsIndex.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .catch(error => next(error))
  })
})
afterAll(() => {
  mongoose.connection.close()
})
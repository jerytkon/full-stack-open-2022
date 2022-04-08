const User = require('../models/user')

const initialBlogs = [
    {
        _id: "6213bdf124ae90037008abb2",
        title: "Age of Empires",
        author: "Eelis",
        url: "aoe.sankari.fi",
        likes: 1,
        __v: 0
        },
        {
        _id: "6213d255974abd766e018cd6",
        title: "Age of Empires",
        author: "Eelis",
        url: "aoe.sankari.fi",
        likes: 1,
        __v: 0
        }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, usersInDb
  }
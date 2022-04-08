
const _ = require("lodash")

const dummy = (blogs) => {
    return Number(1)
  }

const totalLikes = blogs => {
    return blogs.reduce((sum, b) => sum + Number([b.likes]), 0)}

const favoriteBlog = blogs =>{ 
    return blogs.reduce((max, d) => d.likes > max.likes ? d : max, blogs[0])}

const mostBlogs = blogs =>{ 
    const df = blogs.map(blog => blog.author)
    const result = _.countBy(df)
    const maxResult = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)
    const final = {
      author: maxResult,
      blogs: result[maxResult]
    }
    return final
}

const mostLikes = blogs =>{ 

  const result = _.groupBy(blogs, 'author')
  console.log(result)
  const maxResult = Object.keys(result).reduce((a, b) => 
              result[a].reduce((sum, b) => sum + Number([b.likes]), 0)
               > result[b].reduce((sum, b) => sum + Number([b.likes]), 0) ? a : b)
  const maxLikes = result[maxResult].reduce((sum, b) => sum + Number([b.likes]), 0)
  console.log(maxResult)
  console.log(maxLikes)
  const final = {
    author: maxResult,
    blogs: maxLikes
  }
  return final
}
  
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }
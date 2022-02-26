const dummy = (blogs) => {
    return Number(1)
  }

const totalLikes = blogs => {
    return blogs.reduce((sum, b) => sum + Number([b.likes]), 0)}
  
  
  module.exports = {
    dummy, totalLikes
  }
  const favoriteBlog = blogs =>{ 
        return blogs.reduce((max, d) => d > max ? d : max, blogs[0])}

    module.exports = {
        favoriteBlog
      }
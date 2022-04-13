import { useState} from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  console.log(blog)
  return (

    <div className="blog">
    <h1> {blog.title} {blog.author} </h1>
    <ul style={{"listStyleType": "none"}}>
    <li>{blog.url} </li>
    <li>likes: {blog.likes} <button onClick={addLike}>like</button></li>
    <li> added by {blog.user.name}</li>
    <button onClick={deleteBlog}>delete</button> 
    </ul>
    </div>

)}

export default Blog
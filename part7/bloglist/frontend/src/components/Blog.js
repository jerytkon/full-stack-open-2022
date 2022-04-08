import { useState} from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  return (
  <div>
    <button onClick={() => setVisible(!visible)}>view/hide</button>
    <button onClick={addLike}>like</button>
    <div className="blog">
      <li>
    {blog.title} 
    </li>
    <li>{blog.author} </li>
    {visible ? <li>{blog.url}</li> : <p></p>}
    {visible ? <li>likes: {blog.likes}</li> : <p></p>}
    {visible ? <button onClick={deleteBlog}>delete</button> : <p></p>}
    </div>
  </div>
)}

export default Blog
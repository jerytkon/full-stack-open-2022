import { useState} from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)
  return (
  <div>
    <li className="blog">
    {blog.title} {blog.author}  
    {visible ? blog.url : <p></p>}
    {visible ? blog.likes : <p></p>}
    </li>
    <button onClick={() => setVisible(!visible)}>view/hide</button>
    <button onClick={addLike}>like</button>
  </div>
)}

export default Blog
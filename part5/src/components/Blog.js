import { useState} from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)
  return (
  <div>
    {blog.title} {blog.author}  
    {visible ? blog.url : <p></p>}
    {visible ? blog.likes : <p></p>}
    <button onClick={() => setVisible(!visible)}>view/hide</button>
    <button onClick={addLike}>like</button>
  </div>
)}

export default Blog
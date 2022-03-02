import { useState } from 'react'
const LoginForm = ({ createBlog }) => {
const [newTitle, setNewTitle] = useState('')
const [newAuthor, setNewAuthor] = useState('')
const [newUrl, setNewUrl] = useState('')
const handleTitlechange=(event) => {
  setNewTitle(event.target.value)
}
const handleUrlchange= (event) => {
  setNewUrl(event.target.value)
}
const handleAuthorchange=(event) => {
  setNewAuthor(event.target.value)
}

const addBlog = (event) => {
  event.preventDefault()
  createBlog({
    title: newTitle,
    author: newAuthor,
    url: newUrl,
    likes: 0
  })
  setNewTitle('')
  setNewAuthor('')
  setNewUrl('')
}

{
  return     (
    <div>
      <div>
        <h1>Create new</h1>
      </div>
      <form onSubmit={addBlog}>
        <div>
       title:
          <input
            value={newTitle}
            onChange={handleTitlechange}
            placeholder='title'
          />
        </div>
        <div>
       author:
          <input
            value={newAuthor}
            onChange={handleAuthorchange}
            placeholder='author'
          />
        </div>
        <div>
       url:
          <input
            value={newUrl}
            onChange={handleUrlchange}
            placeholder='url'
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}
}

export default LoginForm
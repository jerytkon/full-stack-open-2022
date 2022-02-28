/* eslint-disable */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import LoginForm from './components/LoginForm'
import ShowUser from './components/showUser'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  //EFFECT HOOKIT

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // FORMIT

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {

    return (
      <div>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
          <BlogForm
            username={username}
            handleTitlechange={({ target }) => setNewTitle(target.value)}
            handleUrlchange={({ target }) => setNewUrl(target.value)}
            handleAuthorchange={({ target }) => setNewAuthor(target.value)}
            handleSubmit={addBlog}
            loggedUser={loggedUser}
            setUser={setUser}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
          />
        </Togglable>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
    )
  }




  // APUFUNKTIOT

  const addLike = id => {
    const blog = blogs.find(n => n.id === id)
    console.log("tässä mennään", blog)
    const changedBlog = { ...blog, likes: blog.likes += 1 }
  
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.find({}))
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }


  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  // RENDERÖINTI


  return (
    <div>
      <div>
        <h1>blogs</h1>
      </div>
      <Notification message={errorMessage} />
      {user !== null ? <ShowUser loggedUser={loggedUser} setUser={setUser}/> : <p></p> }
      {user === null ?
        loginForm() :
        blogForm()
      }
      <div>
        { user ? (blogs.map(blog =>
          <Blog key={blog.id} blog={blog} 
          addLike={() => addLike(blog.id)} />
        )) : <p></p> }
      </div>



    </div>
  )
}

export default App

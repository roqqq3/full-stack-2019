import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useField } from './hooks'

function App() {

  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(newBlogs => {
      setBlogs(newBlogs)
    })
    console.log(blogs)
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      let correctUsername = username.value
      let correctPassword = password.value
      const user = await loginService.login({
        correctUsername, correctPassword,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      password.reset()
      username.reset()
    } catch (exception) {
      showMessage('Wrong credentials!')
      console.log('error: ' + exception)
    }
  }

  const Notification = () => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleNewBlog = async (event) => {

    event.preventDefault()
    try {
      const addedBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      showMessage('You added new blog: ' + newTitle + ' ' + newAuthor)
      blogService
        .create(addedBlog)
        .then(data => {
          setBlogs(blogs.concat(data))
          setNewTitle('')
          setNewUrl('')
          setNewAuthor('')
        })
      blogs.concat(addedBlog)
    } catch (exception) {
      console.log('error: ' + exception)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogout = () => {
    blogService.setToken(null)
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username.value}
            type={username.type}
            onChange={username.onChange}
          />
        </div>
        <div>
          password
          <input
            value={password.value}
            type={password.type}
            onChange={password.onChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null) {
    return (
      loginForm()
    )
  } else {
    return (
      <div>
        <Notification />
        <Toggleable buttonLabel="new blog">
          <BlogForm
            handleUrlChange={handleUrlChange}
            handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange}
            handleLogout={handleLogout}
            newUrl={newUrl}
            newTitle={newTitle}
            newAuthor={newAuthor}
            user={user}
            blogs={blogs}
            handleNewBlog={handleNewBlog}/>
        </Toggleable>
        <h2>blogs</h2>
        <p>{user.name}</p>
        <button onClick={() => handleLogout()}>logout</button>
        {[].concat(blogs).sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} currentUser={user} />
        )}
      </div>

    )
  }
}

export default App
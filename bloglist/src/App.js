import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(newBlog)
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`${response.title} by ${response.author} added`, 5))
  }

  const updateLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeSingleBlog = async (blogToRemove) => {
    const ok = window.confirm(`remove '${blogToRemove.title}' by ${blogToRemove.author}?`)
    if (!ok) {
      return
    }
    dispatch(removeBlog(blogToRemove.id))
  }

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          <Notification message={notification} />
          <div>
            <span>{user.username} logged in</span>
            <button onClick={handleLogout}>logout</button>
            <br />
          </div>
          <div>
            <h2>Create new</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <NewBlogForm onCreate={createNewBlog} />
            </Togglable>
          </div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={updateLike}
              removeSingleBlog={removeSingleBlog}
            />
          ))}
        </>
      ) : (
        <>
          <h2>login to app</h2>
          <Notification message={notification} />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </>
      )}
    </div>
  )
}

export default App

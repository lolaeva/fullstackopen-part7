import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { logOutUser, setUpdatedUser } from './reducers/userReducer'

import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const user = useSelector(({ user }) => {
    return user
  })
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(setUpdatedUser(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logOutUser())
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

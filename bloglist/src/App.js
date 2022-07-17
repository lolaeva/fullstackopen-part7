import { Container } from '@mui/material'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogDetails from './components/BlogDetails'

import { initializeBlogs } from './reducers/blogReducer'
import { logOutUser } from './reducers/loggedUserReducer'

import userService from './services/users'

import { Routes, Route, useNavigate } from 'react-router-dom'

import NavBar from './components/Navbar'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState([])

  const loggedUser = useSelector(({ loggedUser }) => {
    return loggedUser
  })
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const notification = useSelector(({ notification }) => {
    return notification
  })

  useEffect(() => {
    userService.getAll().then((result) => {
      setUsers(result)
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logOutUser())
    setUsername('')
    setPassword('')
    navigate('/')
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: '#0f1114'
      },
      secondary: {
        main: '#edf2ff'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Notification message={notification} />

        {loggedUser ? (
          <NavBar loggedUser={loggedUser} handleLogout={handleLogout}></NavBar>
        ) : (
          <>
            <h2>login to app</h2>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </>
        )}
        <Routes>
          <Route path="/" element={<Blogs loggedUser={loggedUser} />} />
          <Route
            path="/blogs/:id"
            element={<BlogDetails blogs={blogs} loggedUser={loggedUser} />}
          />
          <Route path="/users" element={<UsersList users={users} />} />
          <Route path="/users/:id" element={<UserDetails users={users} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App

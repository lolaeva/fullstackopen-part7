import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Home from './components/Home'
import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { logOutUser } from './reducers/loggedUserReducer'

import userService from './services/users'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom'
import NavBar from './components/Navbar'


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

  

  return (
    <div>
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
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} loggedUser={loggedUser} />} />
        <Route path="/users" element={<UsersList users={users} />} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
      </Routes>
    </div>
  )
}

export default App

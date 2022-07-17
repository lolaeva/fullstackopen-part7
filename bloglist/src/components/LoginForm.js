import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

import loginService from '../services/loginService'
import blogService from '../services/blogs'

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

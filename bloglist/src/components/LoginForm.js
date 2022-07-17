import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

import loginService from '../services/loginService'

import { Button, TextField } from '@mui/material'

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
        <TextField
          type="text"
          size="small"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <TextField
          type="password"
          size="small"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" size="small">
        login
      </Button>
    </form>
  )
}

export default LoginForm

import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import blogService from '../services/blogs'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('action.payload', action.payload)
      return action.payload
    },
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const setUpdatedUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logOutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}



export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer
  }
})

export default store

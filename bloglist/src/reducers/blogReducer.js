import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      let idx = state.findIndex(blog => blog.id === action.payload.id)
      state[idx] = action.payload
    },
    deleteBlog(state, action) {
      state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const createBlog = (blogData, loggedUser) => {
  return async (dispatch) => {
    const response = await blogService.create(blogData, loggedUser)
    dispatch(appendBlog(response))
    dispatch(setNotification(`${response.title} by ${response.author} added`, 5))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch(updateBlog(updatedBlog))
  }
}

export const commentBlog = (data, blog) => {
  return async (dispatch) => {
    const response = await blogService.comment(data)

    const updatedBlog = {
      ...blog,
      comments: [
        ...blog.comments, 
        {
        title: response.title,
        id: response.id,
        date: response.date
        }
      ]
    }
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer

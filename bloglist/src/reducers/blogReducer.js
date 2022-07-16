import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
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

export const createBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer;

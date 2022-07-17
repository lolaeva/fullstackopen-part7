import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

import { initializeBlogs, createBlog, removeBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import blogService from '../services/blogs'

const Home = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const blogFormRef = useRef()

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(newBlog)
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`${response.title} by ${response.author} added`, 5))
  }

  

  if (!loggedUser) return null

  return (
    <>
      <h2>blogs</h2>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlogForm onCreate={createNewBlog} />
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // updateLike={updateLike}
          // removeSingleBlog={removeSingleBlog}
        />
      ))}
    </>
  )
}

export default Home

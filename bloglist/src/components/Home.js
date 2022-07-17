import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

import { createBlog} from '../reducers/blogReducer'


import blogService from '../services/blogs'

const Home = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const blogFormRef = useRef()

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog, loggedUser))    
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

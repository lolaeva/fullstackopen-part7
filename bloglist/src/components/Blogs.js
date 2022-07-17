import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { Link } from 'react-router-dom'

import { createBlog } from '../reducers/blogReducer'

import { Table, TableBody, TableContainer, TableCell, TableRow, Paper } from '@mui/material'

const Blogs = ({ loggedUser }) => {
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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow className="blog-item" key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    <span>{blog.title}</span>
                    <span>{blog.author}</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Blogs

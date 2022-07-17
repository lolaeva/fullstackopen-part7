import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

import { Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const BlogDetails = ({ blogs, loggedUser }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((a) => a.id === id)

  const updateLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeSingleBlog = async (blogToRemove) => {
    const ok = window.confirm(`remove '${blogToRemove.title}' by ${blogToRemove.author}?`)
    if (!ok) {
      return
    }
    dispatch(removeBlog(blogToRemove.id))
  }

  if (!blog) return null

  return (
    <>
      <div className='blog-detail-header'>
      <h2>{blog.title}</h2>
      {loggedUser.username === blog.user.username ? (
        <Button onClick={() => removeSingleBlog(blog)} variant="outlined" size="small">
          remove
        </Button>
      ) : (
        <></>
      )}
      </div>
      <div>
        <a href={blog.url}>url</a>
      </div>
      <br />
      <div>
        <span>likes: {blog.likes} </span>
        <Button
          onClick={() => updateLike(blog)}
          variant="outlined"
          size="small"
          startIcon={<ThumbUpIcon />}>
          like
        </Button>
      </div>
      <br />
      <div>added by {blog.author}</div>
      <h4>comments</h4>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.title}</li>
        ))}
      </ul>
      <CommentForm blog={blog} loggedUser={loggedUser} />
      
    </>
  )
}

export default BlogDetails

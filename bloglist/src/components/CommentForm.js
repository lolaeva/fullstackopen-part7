import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import { Button, TextField } from '@mui/material'

const CommentForm = ({ blog, loggedUser }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    const data = {
      blogId: blog.id,
      comment: comment,
      user: loggedUser
    }
    dispatch(commentBlog(data, blog))
    setComment('')
  }
  return (
    <form onSubmit={addComment}>
      <TextField
        type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <br />
      <Button type="submit" variant="contained" size="small">
        add comment
      </Button>
    </form>
  )
}

export default CommentForm

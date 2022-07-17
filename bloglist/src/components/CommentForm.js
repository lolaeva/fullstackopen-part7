import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({blog, loggedUser}) => {
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
      <input
        type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm

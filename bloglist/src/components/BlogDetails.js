import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const BlogDetails = ({ blogs, loggedUser }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((a) => a.id === id)
  console.log("🚀 ~ file: BlogDetails.js ~ line 10 ~ BlogDetails ~ blog", blog)

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
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>url</a>
      </div>
      <div>
        <span>likes: {blog.likes}</span>
        <button onClick={() => updateLike(blog)}>like</button>
      </div>
      <div>added by {blog.author}</div>
      <h4>comments</h4>
      <CommentForm blog={blog} loggedUser={loggedUser}/>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.title}</li>
        ))}
      </ul>
      {loggedUser.username === blog.user.username ? (
        <button onClick={() => removeSingleBlog(blog)}>remove</button>
      ) : (
        <></>
      )}
    </>
  )
}

export default BlogDetails

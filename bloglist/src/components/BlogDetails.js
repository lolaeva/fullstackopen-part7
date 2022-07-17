import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

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
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>url</a>
      </div>
      <div>
        <span>likes: {blog.likes}</span>
        <button onClick={() => updateLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.author}</div>
      <h4>comments</h4>
      <ul>{blog.comments.map(comment => <li>{comment.title}</li>)}</ul>
      {loggedUser.username === blog.user.username ? (
        <button onClick={() => removeSingleBlog(blog)}>remove</button>
      ) : (
        <></>
      )}
    </>
  )
}

export default BlogDetails

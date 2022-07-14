import { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, updateLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const handleLike = (blog) => {
    updateLike(blog)
  }
  const handleDelete = (blog) => {
    removeBlog(blog)
  }

  return (
    <div className="blog-item">
      <div className="blog-item-main">
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <BlogDetails
        blog={blog}
        handleLike={handleLike}
        handleDelete={handleDelete}
        visible={visible}
      />
    </div>
  )
}

export default Blog

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog-item">
      <div className="blog-item-main">
        <Link to={`/blogs/${blog.id}`}>
          <span>{blog.title}</span>
          <span>{blog.author}</span>
        </Link>
      </div>

    </div>
  )
}

export default Blog

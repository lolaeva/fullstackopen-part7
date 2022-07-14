const BlogDetails = ({ blog, handleLike, handleDelete, visible }) => {
  if (!visible) return null
  return (
    <>
      <div>
        <a href={blog.url}>url</a>
      </div>
      <div>
        <span>likes: {blog.likes}</span>
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={() => handleDelete(blog)}>remove</button>
    </>
  )
}

export default BlogDetails

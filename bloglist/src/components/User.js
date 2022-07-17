import { Link } from "react-router-dom"

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <Link to={`/users/${user.id}`}>
      <span>{user.username}</span>
      </Link>
      <span>{user.blogs.length}</span>
    </div>
  )
}

export default User

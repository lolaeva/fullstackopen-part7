import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
  return users.map((user) => (
    <div key='user.id'>
      <Link to={`/users/${user.id}`}>
        <span>{user.username}</span>
      </Link>
      <span>{user.blogs.length}</span>
    </div>
  ))
}

export default UsersList

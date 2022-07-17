import { useParams } from "react-router-dom";
const UserDetails = ({ users }) => {
  const id = useParams().id;
  const user = users.find((a) => a.id === id);
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        
      </ul>
    </div>
  )
}

export default UserDetails

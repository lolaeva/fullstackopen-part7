import { Link } from 'react-router-dom'

const NavBar = ({ loggedUser, handleLogout }) => {
  return (
    <>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <div>
          <span>{loggedUser.username} logged in</span>
          <button onClick={handleLogout}>logout</button>
          <br />
        </div>
      </div>
    </>
  )
}

export default NavBar

import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

const NavBar = ({ loggedUser, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button variant="h6" component="div" sx={{ marginLeft: 'auto' }}>
          <span>{loggedUser.username} logged in </span>
          <Button color="inherit" onClick={handleLogout} variant="outlined" size="small">
            logout
          </Button>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

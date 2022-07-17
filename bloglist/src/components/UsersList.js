import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Paper } from '@mui/material'

const UsersList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    <span>{user.username}</span>
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersList

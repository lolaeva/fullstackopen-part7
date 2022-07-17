import { useState } from 'react'
import { Button, TextField } from '@mui/material'

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        <TextField
          type="text"
          size="small"
          value={title}
          name="title"
          label="title"
          variant="standard"
          sx={{ mt: 1, width: '25ch' }}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          size="small"
          value={author}
          name="author"
          label="author"
          variant="standard"
          sx={{ mt: 1, width: '25ch' }}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          size="small"
          value={url}
          name="url"
          label="url"
          variant="standard"
          sx={{ mt: 1, width: '25ch' }}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" size="small" sx={{ mt: 1 }}>
        create
      </Button>
    </form>
  )
}
export default NewBlogForm

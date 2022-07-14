import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from '../components/NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const createNewBlog = jest.fn()

  render(<NewBlogForm onCreate={createNewBlog} />)

  const input = screen.getByPlaceholderText('author')
  const sendButton = screen.getByText('create')

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].author).toBe('testing a form...')
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from '../components/BlogDetails'

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Lola',
    url: 'url'
  }

  const mockHandler = jest.fn()

  render(<BlogDetails blog={blog} handleLike={mockHandler} visible={true} />)

  const button = screen.getByText('like')
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

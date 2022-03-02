import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// ...

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testi tekijästä',
    url: "ww.www",
    likes: 0
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
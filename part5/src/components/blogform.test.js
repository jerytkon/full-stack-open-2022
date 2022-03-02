
   
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blogform from './Blogformfortest'
import userEvent from '@testing-library/user-event'

test('<Blogform /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<Blogform createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('save')

  userEvent.type(title, 'testing a form...' )
  userEvent.type(author, 'tjaakob' )
  userEvent.type(url, 'twww.wwww' )
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...' )
})
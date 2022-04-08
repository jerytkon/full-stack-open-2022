import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testi tekijästä',
    url: "ww.www",
    likes: 2
  }

  render(<Blog blog={blog} />)

  const titleTest = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  const authorTest = screen.getByText('testi tekijästä', { exact: false })
  const urlTest = screen.queryByText('ww.www', { exact: false })
  expect(titleTest).toBeDefined()
  expect(authorTest).toBeDefined()
  expect(urlTest).toBeNull()
})
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('Blog renders content', () => {
  const blog = {
    title: 'Component testing',
    author: 'Samu',
    url: 'samu.com',
    likes: 4
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing')
  const url = screen.queryByText('samu.com')
  const likes = screen.queryByText('4')
  expect(element).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})
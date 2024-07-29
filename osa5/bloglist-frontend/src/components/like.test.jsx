import { render, screen } from '@testing-library/react'
import BlogInfo from './BlogInfo'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

test('Like button calls its function', async () => {
  const blog = {
    title: 'Component testing',
    author: 'Samu',
    url: 'samu.com',
    likes: 4,
    user: {
        id: '133'
    }
  }

  const testUser = {
    username: 'ManUfan1',
    name: "Barry, 63",
    id: "123"
  }
  const like = vi.fn()
  const deleter = vi.fn()

  const { container } = render(
      <div className="testDiv" >
        <BlogInfo blog={blog} liker={like} deleter={deleter} user={testUser}/>
      </div>
  )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    
    expect(like.mock.calls).toHaveLength(2)
})
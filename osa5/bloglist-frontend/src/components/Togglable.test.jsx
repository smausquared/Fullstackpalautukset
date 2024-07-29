import { render, screen } from '@testing-library/react'
import BlogInfo from './BlogInfo'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

test('button works as expected', async () => {
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
    <Togglable buttonLabel="show...">
      <div className="testDiv" >
        <BlogInfo blog={blog} liker={like} deleter={deleter} user={testUser}/>
      </div>
    </Togglable>
  
  )
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    await user.click(button)
    
    const newdiv = container.querySelector('.togglableContent')
    expect(newdiv).not.toHaveStyle('display: none')
  const author = screen.getByText('Samu', { exact: false })
  const url = screen.getByText('samu.com', { exact: false })
  const likes = screen.getByText('4', { exact: false })
  expect(author).toBeDefined()
})
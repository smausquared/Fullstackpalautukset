import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit with correct information', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
    const messenger = vi.fn()
  
    render(<BlogForm createBlog={createBlog} messenger={messenger}/>)
  
    const titleField = screen.getByPlaceholderText('type title here')
    const authorField = screen.getByPlaceholderText('type author here')
    const urlField = screen.getByPlaceholderText('type url here')
    await user.type(titleField, 'form test title')
    await user.type(authorField, 'form test author')
    await user.type(urlField, 'form test url')
    const sendButton = screen.getByText('Submit')
    await user.click(sendButton)

    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('form test title')
    expect(createBlog.mock.calls[0][0].author).toBe('form test author')
    expect(createBlog.mock.calls[0][0].url).toBe('form test url')

})

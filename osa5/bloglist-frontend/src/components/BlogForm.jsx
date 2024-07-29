import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, messenger }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (event) => {
    event.preventDefault()
    const blogToSend = {
      title: title,
      author: author,
      url: url
    }
    try {
      console.log('getting newBlog')
      const newBlog = await createBlog(blogToSend)
      console.log(newBlog.title)
      setTitle('')
      setAuthor('')
      setUrl('')
      messenger(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        messenger(null)
      }, 5000)
    } catch (exception) {
      messenger('Bad request')
      setTimeout(() => {
        messenger(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleBlog}>
      <div>
              title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='type title here'
        />
      </div>
      <div>
              author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='type author here'
        />
      </div>
      <div>
              url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='type url here'
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  messenger:  PropTypes.func.isRequired
}


export default BlogForm
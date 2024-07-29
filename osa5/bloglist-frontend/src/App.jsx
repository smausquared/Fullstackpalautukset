import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsSorted = [...blogs]
      blogsSorted.sort((a, b) => b.likes - a.likes)
      setBlogs( blogsSorted )
    }
    )
  }, [])

  useEffect(() => { // logout-komento: window.localStorage.removeItem('loggedBlogappUser')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.id)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogAdder = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    newBlog.user = user
    setBlogs(blogs.concat(newBlog))
    return newBlog
  }

  const likeHandler = async (blogObject) => {
    const blogToLike = { ...blogObject }
    blogToLike.likes += 1
    const updatedBlog = await blogService
      .updateBlog(blogToLike)
    updatedBlog.user = blogToLike.user
    const isRightBlog = (blog) => {
      return blog.id === blogObject.id
    }
    const index = blogs.findIndex(isRightBlog)
    const updatedBlogs = [...blogs]
    updatedBlogs[index] = updatedBlog
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const deleteHandler = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      const blogToDelete = await blogService
        .deleteBlog(blogObject)
      const isRightBlog = (blog) => {
        return blog.id === blogObject.id
      }
      const index = blogs.findIndex(isRightBlog)
      const updatedBlogs = [...blogs]
      updatedBlogs.splice(index, 1)
      setBlogs(updatedBlogs)
    }
  }

  const blogContent = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (blogs.map(blog =>
      <div key={blog.id} style={blogStyle}>
        <Blog blog={blog} />
        <Togglable buttonLabel='view'>
          <BlogInfo blog={blog} liker={() => likeHandler(blog)} user={user} deleter={() => deleteHandler(blog)}/>
        </Togglable>
      </div>
    ))
  }

  const messageStyle = {
    color: 'red',
    paddingTop: '5px',
    backgroundColor: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'dashed',
    padding: '10px'
  }

  if (errorMessage) {
    messageStyle.color = errorMessage.startsWith('a new blog')
      ? 'green' : 'red'
  }
  return (
    <div>
      {errorMessage && <h1 style={messageStyle}> {errorMessage}</h1>}
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && blogContent()}
      {user && <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={blogAdder} messenger={setErrorMessage}/>
      </Togglable>}
      
    </div>
  )
}

export default App
import PropTypes from 'prop-types'
const BlogInfo = ({ blog, liker, deleter, user }) => {
  let deleteVisible = false
  if (user.id === String(blog.user.id)) {
    deleteVisible = true
  }
  const showWhenVisible = { display: deleteVisible ? '' : 'none' }
  return (<div>
    {blog.url} <br />
    {blog.likes} likes <button onClick={liker}>like</button> <br />
    {blog.author} <br />
    <div style={showWhenVisible}>
      <button onClick={deleter}>delete</button>
    </div>
  </div>
  )}

BlogInfo.propTypes = {
  blog: PropTypes.object.isRequired,
  liker: PropTypes.func.isRequired,
  deleter: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogInfo
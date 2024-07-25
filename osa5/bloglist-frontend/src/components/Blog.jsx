import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div>
    {blog.title}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
import React, { useState } from 'react'
import BlogService from '../services/blogs'
import axios from 'axios'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser }) => {

  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemoveClick = async () => {
    BlogService.remove(blog)
  }

  const handleLikeClick = async () => {
    blog.likes += 1
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const response = await axios.put(`/api/blogs/${blog.id}`, newBlog)
    return response.data
  }

  const removeButton = () => {
    return (
      <div>
        <button onClick={() => handleRemoveClick()}>remove</button>
      </div>
    )
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowAll(false)}>
          <div>
            {blog.title} {blog.author}
          </div>
          <div className="url">
            {blog.url}
          </div>
          <div className="likes">
            Likes: {blog.likes}
            <button onClick={() => handleLikeClick()}>like</button>
          </div>
          <div className="adder">
            Added by {blog.user.name}
          </div>
          {currentUser && currentUser.username === blog.user.username && removeButton()}
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div className="noInfo" onClick={() => setShowAll(true)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog
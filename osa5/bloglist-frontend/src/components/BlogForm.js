import React from 'react'

const BlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleNewBlog}>
        <h2>Create new</h2>
        title
        <input
          value={props.newTitle}
          name="title"
          onChange={props.handleTitleChange}/> <br/>
        author
        <input
          value={props.newAuthor}
          name="author"
          onChange={props.handleAuthorChange}/> <br/>
        url
        <input
          value= {props.newUrl}
          name="url"
          onChange={props.handleUrlChange}/> <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
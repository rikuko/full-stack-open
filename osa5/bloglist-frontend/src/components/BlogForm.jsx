const BlogForm = ({
  handleSubmit,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>Create new entry</h3>
      <form onSubmit = { handleSubmit }>
        <div>
          Title:
          <input
            type = 'text'
            value = { title }
            onChange = { handleTitle }
            placeholder = 'title'
          />
        </div>
        <div>
          Author:
          <input
            type = 'text'
            value = { author }
            onChange = { handleAuthor }
            placeholder = 'author'
          />
        </div>
        <div>
          Url:
          <input
            type = 'text'
            value = { url }
            onChange = { handleUrl }
            placeholder = 'url'
          />
        </div>
        <p></p>
        <button type = 'submit'>Save</button>
        <p></p>
      </form >
    </div >
  )
}

export default BlogForm
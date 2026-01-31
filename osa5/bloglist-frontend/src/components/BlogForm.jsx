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
      <form onSubmit={ handleSubmit }>
        <div>
          Title:
          <input
            type='text'
            value={ title }
            onChange={ handleTitle }
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={ author }
            onChange={ handleAuthor }
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={ url }
            onChange={ handleUrl }
          />
        </div>
        <p></p>
        <button type='submit'>Save</button>
        <p></p>
      </form >
    </div >
  )
}

export default BlogForm
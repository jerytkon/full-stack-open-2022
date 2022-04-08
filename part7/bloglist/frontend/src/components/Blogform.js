
const LoginForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitlechange,
  handleAuthorchange,
  handleUrlchange,
  handleSubmit

}) => {
  return     (
    <div>
      <div>
        <h1>Create new</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
       title:
          <input
            id='title'
            value={newTitle}
            onChange={handleTitlechange}
          />
        </div>
        <div>
       author:
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorchange}
          />
        </div>
        <div>
       url:
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlchange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default LoginForm
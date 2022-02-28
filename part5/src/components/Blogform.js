
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
            value={newTitle}
            onChange={handleTitlechange}
          />
        </div>
        <div>
       author:
          <input
            value={newAuthor}
            onChange={handleAuthorchange}
          />
        </div>
        <div>
       url:
          <input
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
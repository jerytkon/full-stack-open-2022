import Togglable from './Togglable';
import BlogForm from './Blogform';

const BlogForm2 = ({
  newTitle,
  newAuthor,
  newUrl,
  addBlog,
  loggedUser,
  setUser,
  setNewAuthor,
  setNewTitle,
  setNewUrl,
  noteFormRef,
  username
}) => {
  return (
    <div>
      <Togglable buttonLabel="create new" ref={noteFormRef}>
        <BlogForm
          username={username}
          handleTitlechange={({ target }) => setNewTitle(target.value)}
          handleUrlchange={({ target }) => setNewUrl(target.value)}
          handleAuthorchange={({ target }) => setNewAuthor(target.value)}
          handleSubmit={addBlog}
          loggedUser={loggedUser}
          setUser={setUser}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable>
    </div>
  );
};

export default BlogForm2;

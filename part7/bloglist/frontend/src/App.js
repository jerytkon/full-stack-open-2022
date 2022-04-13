/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/Blogform";
import LoginForm from "./components/LoginForm";
import LoginForm2 from "./components/LoginForm2";
import loginForm from "./components/LoginForm2";
import ShowUser from "./components/showUser";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { createBlog } from "./reducers/blogReducer";
import { selectAllBlogs } from "./reducers/blogReducer";
import { likeBlog, deleteBlogi } from "./reducers/blogReducer";
import userService from "./services/users";
import BlogForm2 from "./components/BlogForm2";
import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "./mystyle.css";

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false);
  const noteFormRef = useRef();

  //EFFECT HOOKIT
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(() => {
      dispatch(initializeBlogs());
    });
  }, [dispatch]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // FORMIT

  // APUFUNKTIOT

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong credentials", 5));
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };
    console.log(blogObject);

    dispatch(createBlog(blogObject));
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} was added`,
        5
      )
    );
  };

  const loggedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser")
  );

  const ShowBlogs = () => {
    const blogs = useSelector(selectAllBlogs);
    const sortedBlogs = [...blogs].sort(
      (a, b) => parseFloat(b.likes) - parseFloat(a.likes)
    );
    return (
      <tbody>{sortedBlogs.map((blog) => (
      <tr key={blog.id}>
        <td>
        <Link to={`/api/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        </td>
      </tr>
    )
    )}
    </tbody>);
  };

  const ShowBlogsPage = () => {
    return (
      <div>
        <BlogForm2
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          addBlog={addBlog}
          loggedUser={loggedUser}
          setUser={setUser}
          setNewAuthor={setNewAuthor}
          setNewTitle={setNewTitle}
          setNewUrl={setNewUrl}
          noteFormRef={noteFormRef}
          username={username}
        />
        <Table striped><ShowBlogs /></Table >
      </div>
    );
  };

  const ShowUser2 = (kayttaja) => {
    const df = kayttaja;
    console.log("here", df);
    try {
      return (
        <tr>
          <td>
            <Link to={`/api/users/${df.kayttaja.id}`}>{df.kayttaja.name}</Link>
          </td>
          <td>{df.kayttaja.blogs.length}</td>
        </tr>
      );
    } catch (error) {
      console.log(error);
      return <div></div>;
    }
  };

  const ShowUsers = ({ users }) => {
    console.log(users);
    try {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Users</th>
                <th>blogs created</th>
              </tr>

              {users.map((user) => (
                <ShowUser2 key={user.id} kayttaja={user} />
              ))}
            </tbody>
          </table>
        </div>
      );
    } catch (error) {
      console.log(error);
      return <div></div>;
    }
  };

  const ShowUserInfo = ({ users }) => {
    const id = useParams().id;
    console.log(users);
    const user = users.find((n) => console.log(n.id) || n.id === id);
    if (!user) {
      return null;
    } else {
      console.log(id);
      console.log(user);
      return (
        <div>
          <h1>blog app</h1>
          <div>
            {user !== null ? (
              <ShowUser loggedUser={loggedUser} setUser={setUser} />
            ) : (
              <p></p>
            )}
          </div>
          <h1>{user.name}</h1>
          <p>Added blogs</p>
          <br></br>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/api/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </div>
      );
    }
  };

  const ShowBlogInfo = () => {
    const blogs = useSelector(selectAllBlogs);
    const id = useParams().id;
    const blog = blogs.find((n) => console.log(n.id) || n.id === id);
    if (!blog) {
      return null;
    } else {
      return (
        <div>
          <h1>blog app</h1>

          <p></p>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() =>
              dispatch(likeBlog(blog)) &
              dispatch(setNotification("you voted " + blog.title, 5)).catch(
                (error) => {
                  dispatch(
                    setNotification(
                      `Blog '${blog.title}' was already removed from server`,
                      5
                    )
                  );
                }
              )
            }
            deleteBlog={() =>
              dispatch(deleteBlogi(blog)) &
              dispatch(setNotification("you deleted " + blog.title, 5))
            }
          />
          <br></br>
        </div>
      );
    }
  };
  // RENDERÖINTI

  const Home = ({ user, loggedUser, setUser, users }) => {
    console.log("loggedUser", loggedUser);
    return (
      <div>
        <div>
          <h1>blog app</h1>
        </div>
        <Notification />
        {user === null ? (
          <LoginForm2
            handleLogin={handleLogin}
            username={username}
            password={password}
            setLoginVisible={setLoginVisible}
            loginVisible={loginVisible}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <BlogForm2
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            addBlog={addBlog}
            loggedUser={loggedUser}
            setUser={setUser}
            setNewAuthor={setNewAuthor}
            setNewTitle={setNewTitle}
            setNewUrl={setNewUrl}
            noteFormRef={noteFormRef}
            username={username}
          />
        )}
        <div>
          <ul><Table striped>{user ? <ShowBlogs /> : <tbody></tbody>}</Table></ul>
        </div>
        <div>
          <ShowUsers users={users} />
        </div>
      </div>
    );
  };

  const padding = {
    padding: 5
  };

  return (
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <Link style={padding} to="/blogs">
            blogs
          </Link>

          {user !== null ? (
            <em>
              {loggedUser.name} logged in &nbsp;{" "}
              <button
                onClick={() => {
                  setUser(null);
                  window.localStorage.removeItem("loggedBlogappUser");
                }}
              >
                log out
              </button>{" "}
            </em>
          ) : (
            <p></p>
          )}
        </div>

        <Routes>
          <Route
            path="/api/users/:id"
            element={<ShowUserInfo users={users} />}
          />
          <Route path="/api/blogs/:id" element={<ShowBlogInfo />} />
          <Route path="/users" element={<ShowUsers users={users} />} />
          <Route path="/blogs" element={<ShowBlogsPage />} />
          <Route
            path="/"
            element={
              <Home
                user={user}
                loggedUser={loggedUser}
                setUser={setUser}
                users={users}
              />
            }
          />
        </Routes>
      </Router>
      <div>
        <br />
        <em>Bloglist app, Jere Rytkönen 2022</em>
      </div>
    </div>
  );
};

export default App;

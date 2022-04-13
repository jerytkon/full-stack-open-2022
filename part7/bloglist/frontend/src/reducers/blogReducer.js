import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload.id;
      const blogFind = state.find((n) => n.id === id);
      const likeAdded = {
        ...blogFind,
        likes: blogFind.likes + 1
      };
      return state.map((blog) => (blog.id !== id ? blog : likeAdded));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    poistaBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    }
  }
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const selectAllBlogs = (state) => state.blogs;

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const votable = await blogsService.addLike(id);
    dispatch(like(votable));
  };
};

export const deleteBlogi = (id) => {
  return async (dispatch) => {
    const votable = await blogsService.poista(id);
    dispatch(poistaBlog(votable));
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, like, appendBlog, poistaBlog } = blogSlice.actions;
export default blogSlice.reducer;

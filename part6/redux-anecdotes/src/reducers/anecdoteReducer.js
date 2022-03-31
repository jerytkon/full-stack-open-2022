import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'


const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
      
    },*/
    vote(state, action) {
      const id = action.payload.id
      const anecdoteFind = state.find(n => n.id === id)
      const likeAdded = {
        ...anecdoteFind, votes: anecdoteFind.votes + 1
      }
      return state.map(anecdote =>
        (anecdote.id !== id ? anecdote : likeAdded )
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes= await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const selectAllAnecdotes = state =>  state.anecdotes

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votable = await anecdotesService.addLike(id)
    dispatch(vote(votable))
  }
}



export const { setAnecdotes, vote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
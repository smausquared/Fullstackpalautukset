import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
      voteFor(state, action) {
        const id = action.payload
        const toVote = state.find(a => a.id === id)
        const voted = {...toVote, votes: toVote.votes + 1}
        const anecdotesByVotes = state.map(a => a.id !== id ? a : voted)
        anecdotesByVotes.sort((a, b) => b.votes - a.votes)
        return anecdotesByVotes
      },
      createNew(state, action) {
        state.push(action.payload)
      },
      setAnecdotes (state, action) {
        return action.payload
      }
  }
})

export const { voteFor, createNew, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createNew(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const voted = await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteFor(voted.id))
  }
}

export default anecdoteSlice.reducer
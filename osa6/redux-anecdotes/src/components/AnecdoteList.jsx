import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { timedMessage } from '../reducers/notifyReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      return state.filter ?
      state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1)
      : state.anecdotes
    })

    const dispatch = useDispatch()
    
    const voteForAnecdote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(timedMessage(`you voted for '${anecdote.content}'`, 5))
      }
    
    return (
    anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )
    )}

export default AnecdoteList
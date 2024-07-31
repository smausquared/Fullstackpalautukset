import { useMessageDispatch } from '../MessageContext'

const AnecdoteForm = ({ mutation }) => {
  const dispatch = useMessageDispatch()
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate({ content, votes: 0 })
    if (content.length < 5) {
      dispatch({type: 'SET_MESSAGE', payload: `anecdote too short, must have length 5 or more`})
    setTimeout(() => {
      dispatch({type: 'SET_MESSAGE', payload: ''})
    }, 5000)
    } else {
    dispatch({type: 'SET_MESSAGE', payload: `added '${content}'`})
    setTimeout(() => {
      dispatch({type: 'SET_MESSAGE', payload: ''})
    }, 5000)
  }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

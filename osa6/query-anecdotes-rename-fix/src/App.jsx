import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useMessageDispatch } from './MessageContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()
  const postAnecdote = newAnecdote => {
    return axios.post('http://localhost:3001/anecdotes', newAnecdote)
    .then(res=> res.data)
  }
 
const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
  return response.data
}
  
  const newAnecdoteMutation = useMutation({ mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes') 
    },
   })
  
   const anecdoteVoteMutation = useMutation({ mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes') 
    },
   })
  
  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'SET_MESSAGE', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({type: 'SET_MESSAGE', payload: ''})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not availabe due to problems in server </div>
  }


  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm mutation={newAnecdoteMutation}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

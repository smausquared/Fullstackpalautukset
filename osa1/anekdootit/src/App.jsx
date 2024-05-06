import { useState } from 'react'

function getRandomInt(min, max) { // kopioitu suoraan mozillalta
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const Button = (props) => {
  console.log(props.text)
  return (
    <div>
    <button onClick={props.handleClick}>
    {props.text}
    </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [selected, setSelected] = useState(0)

  const highest = (thing) => {
    let max = 0
    thing.forEach(value=> {
      if (value > max) {
        max = value
      }
    })
    return max
  }

  const voter = (i) => {
    const copy = [...votes]
    copy[i] += 1
    setVotes(copy)
  }

  let most = votes.indexOf(highest(votes))
  console.log(highest(votes))
  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' handleClick={() => voter(selected)}/>
      <Button text='next anecdote' handleClick={() => {setSelected(getRandomInt(0,7))}}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
      <p>has {votes[most]} votes</p>
    </div>
  )
}

export default App
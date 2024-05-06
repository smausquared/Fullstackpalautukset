import { useState } from 'react'

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

const StatisticLine = (props) => {
  const text = props.text
  const amount = props.amount
  console.log(text, amount)
  return (
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const all = props.goodamount + props.neutralamount + props.badamount
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
    <h1>statistics</h1>
    <table>
      <StatisticLine text='good' amount={props.goodamount}/>
      <StatisticLine text='neutral' amount={props.neutralamount}/>
      <StatisticLine text='bad' amount={props.badamount}/>
      <StatisticLine text='all' amount={all}/>
      <StatisticLine text='average' amount={(props.badamount*-1 + props.goodamount)/all}/>
      <StatisticLine text='average' amount={props.goodamount/all*100+' %'}/>
    </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={() => setBad(bad+1)} text='bad'/>
      <Statistics goodamount={good} neutralamount={neutral} badamount={bad}/>
    </div>
  )
}

export default App
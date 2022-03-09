import { useState } from 'react'
const Display = props => <tr><th>{props.text}</th><td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  const checkTotal = props.good + props.neutral + props.bad
  console.log(checkTotal)

  if (checkTotal===0) {
    return (
    <div> 
      <h1> statistics </h1>
      <p>Please leave feedback</p>
    </div> )
  } else { 
  return (
   <div>
    <h1> statistics </h1>
  <table>
    <tbody>
      <Display text='Good' value={props.good}/>
      <Display text='Neutral' value={props.neutral}/>
      <Display text='Bad' value={props.bad}/>
      <Display text='all' value={props.good + props.bad + props.neutral}/>
      <Display text='average' value={(props.good + props.bad + props.neutral) / 3}/>
      <Display text='positive' value={props.good / (props.good + props.bad + props.neutral)}/>
    </tbody>
  </table>
  </div> 
  )
  }
} 
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    console.log(good)
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    console.log(neutral)
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    console.log(bad)
    setBad(newValue)
  }
  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App

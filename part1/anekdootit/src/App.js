import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const startA = Array(7).fill(0)
  const [points, setPoints] = useState(startA)


  const handleClick = () => {
    const newNumber = points[selected] += 1
    const copy = [...points]
    copy[selected] = newNumber
    setPoints(copy)
  }

  const mostVotes = () => {
    const max = Math.max(...points)
    console.log(max)
    const index = points.indexOf(max)
    console.log(index)
    return index

  }

  return (
    <div>
      <div>
      <h1>Anecdote of the day</h1>
      <button onClick={handleClick}>
        vote
        </button>
      <button onClick={() => setSelected(Math.floor((Math.random() * (anecdotes.length - 1))))}>
        next anecdote
        </button>
      </div>
      {anecdotes[selected]}
      <div>
      has {points[selected]} votes
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
      </div>
        {anecdotes[mostVotes()]}
        <div>
        has {points[mostVotes()]} votes
        </div>
    </div>
  )
}

export default App

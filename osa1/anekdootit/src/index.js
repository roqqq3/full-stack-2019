import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes, selected, points}) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>votes {points[selected]}</p>
  </div>
)

const MostVotes = ({anecdotes, points}) => {
  let mostPointsIndex = 0
  for (let i = 1; i < 6; i++) {
    if (points[i] > points[mostPointsIndex]) {
      mostPointsIndex = i
    }
  }
  return(
  <div>
    <h1>Anecdote with the most votes</h1>
    <p>{anecdotes[mostPointsIndex]}</p>
    <p>has {points[mostPointsIndex]} votes</p>
  </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  const handleVote = (anecdote) => {
    const newPoints = {...points}
    newPoints[anecdote] += 1
    setPoints(newPoints)
  }

  const handleSelect = (amount) => {
    const randomInteger = Math.floor(Math.random() * amount)
    setSelected(randomInteger)
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} points={points} />
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={() => handleSelect(6)}>next anectode</button>
      <MostVotes anecdotes={props.anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
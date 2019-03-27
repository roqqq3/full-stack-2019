import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackHeader = () => (
    <h1>anna palautetta</h1>
)

const StatisticsHeader = () => (
    <h1>statistiikka</h1>
)

const Button = ({text, state, setState}) => (
    <button onClick={() => setState(state+1)}>{text}</button>
)

const Buttons = ({setGood, setNeutral, setBad, good, neutral, bad}) => (
    <div>
        <Button text="hyvä" state={good} setState={setGood} />
        <Button text="neutraali" state={neutral} setState={setNeutral} />
        <Button text="huono" state={bad} setState={setBad} />
    </div>
)

const Statistic = ({text, value}) => (
    <tr><td>{text} {value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) {
        return <p>Ei yhtään palautetta annettu</p>
    }
    return(
        <table>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={total} />
                <Statistic text="keskiarvo" value={(good - bad) / (total)} />
                <Statistic text="positiivisia" value={(good / (total) * 100).toString() + " %"} />
            </tbody>
        </table>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedbackHeader />
      <Buttons good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
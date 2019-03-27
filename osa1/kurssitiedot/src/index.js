import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Content = (props) => (
    <div>
        <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
        <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
        <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Total = (props) => (
    <p>yhteensä {props.course.parts.map(i => i.exercises).reduce((a, b) => a + b)} tehtävää</p>
)

const App = () => {

    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
    }

  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
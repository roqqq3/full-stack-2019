import React from 'react'

const Header = ({name}) => (
    <h1>{name}</h1>
)

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Content = ({parts}) => (
  parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Total = ({parts}) => (
    <p>yhteensä {parts.map(i => i.exercises).reduce((a, b) => a + b)} tehtävää</p>
)

export default Course
import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({course}) => (
    <h1>{course.name}</h1>
  )

  const Content = ({course: {parts}}) => (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )

  const Part = ({part}) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )

  const Total = ({course: {parts}}) => {
    const laskuri = (kokoaja, part) => kokoaja + part.exercises
    const summa = parts.reduce(laskuri, 0)
    return <p>Number of exercises {summa}</p>
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
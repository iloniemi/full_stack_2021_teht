import React from 'react'

const Course = ({course}) => {

    console.log('Courselle tuli:',course);
    
  
    const Header = ({course}) => (
      <h2>{course.name}</h2>
    )
  
    const Content = ({course: {parts}}) => (
      parts.map(part => <Part key={part.id} part={part} />)
    )
  
    const Part = ({part}) => (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  
    const Total = ({course: {parts}}) => {
      const laskuri = (kokoaja, part) => kokoaja + part.exercises
      const summa = parts.reduce(laskuri, 0)
      return <p><b>Number of exercises {summa}</b></p>
    }
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  export default Course
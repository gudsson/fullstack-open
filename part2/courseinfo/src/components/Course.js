import React from 'react'

const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total total={course.parts.reduce((a, c) => a + c.exercises, 0)} /> 
        </div>
        )
      )}
    </>
  )
}

const Header = ({ title }) => <h1>{title}</h1>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = ({ total }) => {
  return (
    <p>
      <strong>total of {total} exercise{total === 1 ? '' : 's'}</strong>
    </p>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

export default Course
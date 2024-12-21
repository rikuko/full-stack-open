
const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      Course name: {props.part} <br />
      Number of exercises: {props.exercise}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      Total number of exercises {props.exercises}
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercise1 = 10

  const part2 = 'Using props to pass data'
  const exercise2 = 7

  const part3 = 'State fo component'
  const exercise3 = 14

  return (
    <div>
      <Header course={course} />

      <Content part={part1} exercise={exercise1} />
      <br />
      <Content part={part2} exercise={exercise2} />
      <br />
      <Content part={part3} exercise={exercise3} />
      <br />
      <Total exercises={exercise1 + exercise2 + exercise3} />
    </div>
  )
}


export default App

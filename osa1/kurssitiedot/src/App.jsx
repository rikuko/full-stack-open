
const Header = (props) => {
  console.log(props, 'Header')
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  console.log(props, 'Part')
  return (
    <div>
      Course name: {props.part.name}
      <br />
      Number of exercises:  {props.part.exercise}
    </div>
  )
}

const Content = (props) => {
  console.log(props, 'Content')
  const juju = props
  return (
    <>
      <Part part={props.exercises[0]} />
      <br />
      <Part part={props.exercises[1]} />
      <br />
      <Part part={props.exercises[2]} />
      <br />
    </>
  )
}

const Total = (props) => {
  console.log(props, 'Total')
  return (
    <div>
      Total umber of exercises {props.count}
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

  const exercises = [
    { name: 'Fundamentals of React', exercise: 10 },
    { name: 'Using props to pass data', exercise: 7 },
    { name: 'State fo component', exercise: 14 },
  ]

  return (
    <div>
      <Header course={course} />

      <Content exercises={exercises} />

      <Total count={exercises[0].exercise + exercises[1].exercise + exercises[2].exercise} />
      <br />
      <br />
    </div>
  )
}


export default App

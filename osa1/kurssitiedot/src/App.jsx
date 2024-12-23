
const Header = (props) => {
  console.log('Header', props)
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
      Number of exercises: {props.part.exercise}
    </div>
  )
}

const Content = (props) => {
  console.log('Content', props)
  const juju = props
  return (
    <>
      <Part part={props.content[0]} />
      <br />
      <Part part={props.content[1]} />
      <br />
      <Part part={props.content[2]} />
      <br />
    </>
  )
}

const Total = (props) => {
  console.log('Total', props)
  return (
    <div>
      Total umber of exercises {props.part}
    </div>
  )
}


const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercise: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercise: 7
  }
  const part3 = {
    name: 'State fo component',
    exercise: 14
  }

  return (
    <>
      <Header course={course} />

      <Content content={[part1, part2, part3]} />

      <Total part={part1.exercise + part2.exercise + part3.exercise} />
    </ >
  )
}


export default App


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
      Total umber of exercises {props.content[0].exercise + props.content[1].exercise + props.content[2].exercise}
    </div>
  )
}


const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State fo component',
      exercise: 14
    }
  ]

  return (
    <>
      <Header course={course} />

      <Content content={parts} />

      <Total content={parts} />
    </ >
  )
}


export default App

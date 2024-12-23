
const Header = (props) => {
  console.log('Header', props)
  return (
    <div>
      <h1>{props.course.name}</h1>
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
      <Part part={props.course.parts[0]} />
      <br />
      <Part part={props.course.parts[1]} />
      <br />
      <Part part={props.course.parts[2]} />
      <br />
    </>
  )
}

const Total = (props) => {
  console.log('Total', props)
  return (
    <div>
      Total umber of exercises {props.course.parts[0].exercise + props.course.parts[1].exercise + props.course.parts[2].exercise}
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header course={course} />

      <Content course={course} />

      <Total course={course} />
    </ >
  )
}


export default App

import { useState } from "react"


const Header = ({ header }) => {
    console.log('Header name: ', header)
    return (
        <div key={header.id}>
            {header}
        </div>
    )
}

const Part = ({ parts, name }) => {
    console.log('Part props ', parts)
    console.log('Part props ', name)
    return (
        <>
            <Header header={<h2>{name}</h2>} />
            {parts.map(part =>
                <li key={part.id}>
                    {part.name + ' ' + part.exercises}
                </li>
            )}
        </>

    )
}

const Counter = ({ courses }) => {
    console.log('Counter props: ', courses)

    const allParts = courses.map(course => course.parts)
    console.log('All parts ', allParts)

    const allInOne = [].concat(...allParts)
    console.log('All in one ', allInOne)

    const exercises = allInOne.map(exercise => exercise.exercises)
    console.log('Exercises ', exercises)


    const count = 0
    const sum0fExercises = exercises.reduce((counter, value) => counter + value, count,)
    console.log('Sum of exercises: ', sum0fExercises)


    return (
        <div>
            <p><strong>Total of {sum0fExercises} exercises</strong></p>
        </div>
    )
}

const Course = ({ courses }) => {
    console.log('Courses prop: ', courses)

    return (
        <div>
            <Header header={<h1>Web development curriculum</h1>} />
            {courses.map(course =>
                <div key={course.id}>
                    {<Part parts={course.parts} name={course.name} />}
                </div>
            )
            }
            <Counter courses={courses} />
        </div>
    )
}
export default Course;

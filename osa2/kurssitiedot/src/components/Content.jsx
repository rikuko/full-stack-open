import Part from "./Part";


const Content = ({ content }) => {
    console.log('Course content ', content)

    const exercises = []
    const collector = exercises.concat(
        content.map(count =>
            count.exercises
        )
    )
    console.log('Exercises array ', exercises)
    console.log('Collector array ', collector)


    const count = 0
    const sum0fExercises =
        collector.reduce((counter, value) => counter + value, count,)


    console.log('Initial value: ', count)


    return (
        <div>
            <ul>
                {content.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
            <p><strong>Total number of exercises is {sum0fExercises}</strong> </p>
        </div>
    )
}
export default Content;

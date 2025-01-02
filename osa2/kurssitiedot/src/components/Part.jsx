

const Part = ({ part }) => {
    console.log('Part content ', part)
    return (
        <>
            <li>{part.name} {part.exercises}</li >
            <br />
        </>
    )
}
export default Part

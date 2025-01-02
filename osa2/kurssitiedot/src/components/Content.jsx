import Part from "./Part";


const Content = ({ content }) => {
    console.log('Course content ', content)
    return (
        <>
            <ul>
                {content.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
        </>
    )
}
export default Content;

import Header from "./Header";
import Content from "./Content"


const Course = ({ course }) => {
    console.log('Kurssi tiedot: ', course)
    return (
        <>
            <Header id={course.id} header={course.name} />
            <Content content={course.parts} />
        </>
    )
}
export default Course;

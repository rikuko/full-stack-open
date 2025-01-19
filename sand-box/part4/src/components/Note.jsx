const Note = ({ note }) => {
    console.log('Note props: ', note)
    return (
        <li>{note.content}</li>
    )
}

export default Note
const Contact = ({ contact }) => {
    console.log('Contact props: ', contact)
    return (
        <>
            <li>{contact.name}</li>
            <br />
        </>
    )
}

export default Contact
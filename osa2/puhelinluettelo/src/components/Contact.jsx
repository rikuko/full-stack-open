const Contact = ({ contact }) => {
    console.log('Contact props: ', contact)
    return (
        <>
            <li>{contact.name} {contact.number}</li>
            <br />
        </>
    )
}

export default Contact
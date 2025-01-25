const Contact = ({ contact, removeContact }) => {
  console.log("Contact props: ", contact)
  return (
    <>
      <li>
        {contact.name}
        {contact.number}
        <br />
        {contact.id}
        <button onClick={removeContact}>Delete</button>
      </li>
    </>
  )
}

export default Contact

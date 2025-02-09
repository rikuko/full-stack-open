const Contact = ({ contact, removeContact }) => {
  console.log("Contact props: ", contact)
  return (
    <>
      <li>
        {contact.name}
        {contact.number}
        <button onClick={removeContact}>Delete</button>
      </li>
    </>
  )
}

export default Contact

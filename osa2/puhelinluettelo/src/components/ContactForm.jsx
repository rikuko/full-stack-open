
const ContactForm = ({ addContact, newContact, handleNewContact, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addContact}>
      <div>Name: <input value={newContact} onChange={handleNewContact} /></div>
      <div>Number: <input value={newNumber} onChange={handleNewNumber} /></div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default ContactForm
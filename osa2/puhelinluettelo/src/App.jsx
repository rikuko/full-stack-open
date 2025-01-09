import { useState } from 'react'
import Contact from './components/Contact'
import './css/main.css'


const App = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Arto Hellas'
    }
  ])

  const [newContact, setNewContact] = useState('Add new contact')

  const addContact = (event) => {
    event.preventDefault()
    console.log('Add-button clicked ', event.target)
    const newObject = {
      id: String(contacts.length + 1),
      name: newContact
    }
    setContacts(contacts.concat(newObject))
    setNewContact('')
  }

  const handleContactChange = (event) => {
    console.log('Text in name input field: ', event.target.value)
    setNewContact(event.target.value)
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addContact}>
        <div>
          Name: <input value={newContact}
            onChange={handleContactChange}
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contacts.map(contact =>
          <Contact key={contact.id} contact={contact} />
        )}
      </ul>
    </div>
  )

}

export default App

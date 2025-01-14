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
  const [names, setNames] = useState([])

  const addContact = () => {
    event.preventDefault()
    console.log('Add-button clicked ')
    const newObject = {
      id: contacts.length + 1,
      name: newContact
    }

    if (names.includes(newContact)) {
      return alert(`${newContact} all ready exist`)
    }
    else setContacts(contacts.concat(newObject))
    setNewContact('')
    setNames([])
  }

  const handleNewContact = (event) => {
    console.log('Handle new contact: ', event.target.value)
    setNewContact(event.target.value)
    setNames(names.concat(contacts.map(contact => contact.name)))

  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addContact}>
        <div>
          Name: <input value={newContact}
            onChange={handleNewContact}
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

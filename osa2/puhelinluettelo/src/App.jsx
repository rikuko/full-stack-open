import { useState } from 'react'
import Contact from './components/Contact'
import './css/main.css'


const App = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: 123456
    }
  ])

  const [newContact, setNewContact] = useState('Add new contact')
  const [names, setNames] = useState([])

  const [newNumber, setNewNumber] = useState('123456')

  const addContact = () => {
    event.preventDefault()
    console.log('Add-button clicked ')
    const newObject = {
      id: contacts.length + 1,
      name: newContact,
      number: newNumber
    }

    if (names.includes(newContact)) {
      return alert(`${newContact} all ready exist`)
    }
    else setContacts(contacts.concat(newObject))
    setNewContact('')
    setNames([])
    setNewNumber('')
  }

  const handleNewContact = (event) => {
    console.log('Handle new contact: ', event.target.value)
    setNewContact(event.target.value)
    setNames(names.concat(contacts.map(contact => contact.name)))
  }

  const handleNewNumber = (event) => {
    console.log('Handle new number ', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={addContact}>
        <div>Name: <input value={newContact} onChange={handleNewContact} /></div>
        <div>Number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div>
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

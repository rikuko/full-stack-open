import { useState, useEffect } from 'react'
import contactService from './services/contacts'

import Contact from './components/Contact'
import ContactForm from './components/ContactForm'
import ContactSearch from './components/ContactSearch'
import Message from './components/Message'

import './css/main.css'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [newContact, setNewContact] = useState()
  const [newNumber, setNewNumber] = useState()
  const [names, setNames] = useState([])
  const [message, setMessage] = useState(null)

  const hook = () => {
    contactService
      .getAll()
      .then((response) => {
        setContacts(response.data)
        setFilteredContacts(response.data)
      })
  }
  useEffect(hook, [])

  // Käsittelee uuden yhteystiedon lisäämisen ja tarkistaa onko nimi jo olemassa
  const addContact = (event) => {
    event.preventDefault()
    console.log('Add-button clicked ')
    const newObject = {
      name: newContact,
      number: newNumber,
    }

    if (names.includes(newContact)) {
      return alert(`${newContact} all ready exist`)
    } else
      contactService
        .create(newObject)
        .then((response) => {
          console.log(response)
          setContacts(contacts.concat(newObject))
          setNewContact('')
          setNames([])
          setNewNumber('')
          setFilteredContacts(contacts.concat(newObject))
          setMessage(`${newContact} added to the phone book`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
  }

  // Poistaa yhteystiedon id:n perusteella
  const removeContactById = (id) => {
    console.log('Poistettava kontakti ', id)
    const name = contacts.find((contact) => contact.id === id).name
    window.confirm(`Do you want to delete ${name}?`)
    contactService
      .remove(id)
      .then((response) => {
        console.log('Response: ', response)
        console.log('Poistettu id: ', id)
        setFilteredContacts(contacts.filter((contact) => contact.id !== id))
        setContacts(contacts.filter((contact) => contact.id !== id))
      })
  }

  // Käsittelee uuden yhteystiedon lisäämisen
  const handleNewContact = (event) => {
    console.log('Handle new contact: ', event.target.value)
    setNewContact(event.target.value)
    setNames(names.concat(contacts.map((contact) => contact.name)))
  }

  // Käsittelee uuden numeron lisäämisen
  const handleNewNumber = (event) => {
    console.log('Handle new number ', event.target.value)
    setNewNumber(event.target.value)
  }

  // Käsittelee yhteystietojen hakemisen
  const handleContactSearch = (event) => {
    console.log('Contact search: ', event.target.value)
    setFilteredContacts(
      contacts.filter((contact) => contact.name.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }

  return (
    <div>
      <h1>Phone Book</h1>
      <ContactSearch
        newContact={newContact}
        handleContactSearch={handleContactSearch}
      />
      <h2>Add new contact</h2>


      <Message message={message} />


      <ContactForm
        addContact={addContact}
        newContact={newContact}
        handleNewContact={handleNewContact}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            removeContact={() => removeContactById(contact.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App

import { useState } from "react";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import ContactSearch from "./components/ContactSearch";
import "./css/main.css";


const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const [newContact, setNewContact] = useState();
  const [newNumber, setNewNumber] = useState();
  const [names, setNames] = useState([]);


  const addContact = (event) => {
    event.preventDefault();
    console.log("Add-button clicked ");
    const newObject = {
      id: contacts.length + 1,
      name: newContact,
      number: newNumber,
    };

    if (names.includes(newContact)) {
      return alert(`${newContact} all ready exist`);
    } else setContacts(contacts.concat(newObject));
    setNewContact("");
    setNames([]);
    setNewNumber("");
    setFilteredContacts(contacts.concat(newObject));
    
  };

  const handleNewContact = (event) => {
    console.log("Handle new contact: ", event.target.value);
    setNewContact(event.target.value);
    setNames(names.concat(contacts.map((contact) => contact.name)));
  };

  const handleNewNumber = (event) => {
    console.log("Handle new number ", event.target.value);
    setNewNumber(event.target.value);
  };

  const handleContactSearch = (event) => {
  console.log('Contact search: ',event.target.value)
  setFilteredContacts(contacts.filter(contact => contact.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h1>Phone Book</h1>
      <ContactSearch newContact={newContact} handleContactSearch={handleContactSearch} />
     
      <h2>Add new contact</h2>

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
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default App;

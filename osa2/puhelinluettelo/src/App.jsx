import { useState, useEffect } from "react";
import axios from "axios";

import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import ContactSearch from "./components/ContactSearch";

import "./css/main.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [newContact, setNewContact] = useState();
  const [newNumber, setNewNumber] = useState();
  const [names, setNames] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setContacts(response.data);
      setFilteredContacts(response.data);
    });
  };

  useEffect(hook, []);

  // Käsittelee uuden yhteystiedon lisäämisen ja tarkistaa onko nimi jo olemassa
  const addContact = (event) => {
    event.preventDefault();
    console.log("Add-button clicked ");
    const newObject = {
      name: newContact,
      number: newNumber,
    };

    if (names.includes(newContact)) {
      return alert(`${newContact} all ready exist`);
    } else
      axios
        .post("http://localhost:3001/persons", newObject)
        .then((response) => {
          console.log(response);
          setContacts(contacts.concat(newObject));
          setNewContact("");
          setNames([]);
          setNewNumber("");
          setFilteredContacts(contacts.concat(newObject));
        });
  };

  // Käsittelee uuden yhteystiedon lisäämisen
  const handleNewContact = (event) => {
    console.log("Handle new contact: ", event.target.value);
    setNewContact(event.target.value);
    setNames(names.concat(contacts.map((contact) => contact.name)));
  };

  // Käsittelee uuden numeron lisäämisen
  const handleNewNumber = (event) => {
    console.log("Handle new number ", event.target.value);
    setNewNumber(event.target.value);
  };

  // Käsittelee yhteystietojen hakemisen
  const handleContactSearch = (event) => {
    console.log("Contact search: ", event.target.value);
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <ContactSearch
        newContact={newContact}
        handleContactSearch={handleContactSearch}
      />
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

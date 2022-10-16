import {useEffect, useState} from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import {Filter} from './Filter/Filter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App =()=> {
  const [contacts, setContacts] = useState(()=> JSON.parse(localStorage.getItem('contacts')) ?? initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(()=> {localStorage.setItem('contacts', JSON.stringify(contacts) )},[contacts])

  const addContact = newContact => {
        if (
      contacts.find(
        ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    } else {
      return  setContacts([...contacts, newContact]);
    }
  };

  const filterSearch = e => {
    setFilter(e.currentTarget.value);
  };

  const contactsRender = () => {
       return contacts.filter(i =>
      i.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = e => {
    const contactId = e.currentTarget.id;
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  
  };

 
    return (
      <div
        style={{
          width: 270,
          textAlign: 'center',
          marginLeft: 8,
          padding: '12px 16px',
          borderRadius: 4,
          backgroundColor: 'gray',
          color: 'white',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={filterSearch} />
        <ContactList
          contacts={contactsRender()}
          onDeleteContact={onDeleteContact}
        />
      </div>
    );
  }



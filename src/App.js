import React, { Component } from 'react';

import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import initialContacts from './data/contacts.json'

import s from './App.module.css';
import { v4 as uuid } from 'uuid';



class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  formSubmitHandler = (newName, number, reset) => {
    console.log(reset);

    if (this.state.contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase())) {
          alert('Contact is already exist');
          reset();
          return;
        }

    const contact = {
      id: uuid(),
      name: newName,
      number,
    }
    console.log(contact);
    this.setState(prev => {
      reset();
      return {
        contacts: [...prev.contacts, contact]
      }
    })
  }

  handleCheckUniqueContact = (name) => {
    // const {contacts} = this.state;


    // const isExistContact = !!contacts.find(contact => contact.name === name);
    // isExistContact ? alert('Contact is already exist') : alert('Hello');
    
    // return !isExistContact;
  }
  
  deleteContact = (uniqId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== uniqId)
    }))
  }

  changeFilter = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  visibleContacts = () => {
    const {contacts, filter} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  }

  render() {
    const {filter} = this.state;
    const filteredContacts = this.visibleContacts();
      return (
          <div className={s.container}>
              <ContactForm 
                onSubmit={this.formSubmitHandler}
                onCheckUnique={this.handleCheckUniqueContact}/>

              <h2>Contacts</h2>
              <Filter 
                value={filter} 
                onChange={this.changeFilter}/>
              <ContactList 
                contacts={filteredContacts} 
                onRemove={this.deleteContact}/>
          </div>
      );
  }
}

export default App;
import React, { useState, useEffect } from 'react'
import Filter from './modules/Filter'
import Contacts from './modules/Contacts'
import InputForm from './modules/Inputform'
import personService from './modules/persons'
import Notification from './modules/Notification'

const App = () => {
  
  // States
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchtext, setSearchtext] = useState('')
  const [notification, setNotification] = useState(null)

  // Function to set notification for user to see for 5 seconds
  const notifyUser = (message) => {
    setNotification({message, color: 'green'})
    setTimeout(() => (setNotification(null)), 5000)
  }

  const warnUser = (message) => {
    setNotification({message, color: 'red'})
    setTimeout(() => (setNotification(null)), 5000)
  }

  // Getting contacts from the server
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])
  
  const handleNameInputChange = event => setNewName(event.target.value)
  const handleNumberInputChange = event => setNewNumber(event.target.value)
  const handleSearchtextChange = event => setSearchtext(event.target.value)

  const formFields = [
    { name: 'name', value: newName, handleChange: handleNameInputChange },
    { name: 'number', value: newNumber, handleChange: handleNumberInputChange }
  ]
  
  // Submitting new contact to the list
  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Check if person with same name already on the list
    const personFound = persons.find(person => person.name === newName)
    
    // Already in the phonebook
    if (personFound !== undefined) {
      // Replace or not
      const replace = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (replace) {
        const updatedPerson = {...personFound, number: newNumber}
        personService.update(updatedPerson)
                      .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                        notifyUser(`${returnedPerson.name} updated`)
                      }).catch(data => {
                        warnUser(`Could not update ${updatedPerson.name}`)
                      })
      } else {
        // Cancelled
        return
      }
    }
    
    // Not in the phonebook
    if (personFound === undefined) {
      //Adding the new person
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
        .then(returnedPerson => {   
          setPersons(persons.concat(returnedPerson))
          notifyUser(`${returnedPerson.name} added to the phonebook`)
        })
        .catch(error => {
          warnUser(error.response.data.error)
        })
    }
    
    // Clear inputfields
    setNewName('')
    setNewNumber('')
  }
  
  // Deleting a person
  const removePerson = (id, name) => (
    () => {
      if (window.confirm(`Remove ${name} from contacts?`)) {
        personService.deleteResource(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notifyUser(`${name} removed from the phonebook`)
        })
      }
    }
  )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={searchtext} onChange={handleSearchtextChange} />
      <h3>Add new</h3>
      <InputForm handleSubmit={handleSubmit} fields={formFields} />
      <h3>Numbers</h3>
      <Contacts persons={persons} searchtext={searchtext} handleDelete={removePerson} />
    </div>
  )
}

export default App
import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchtext, setSearchtext] = useState('')
  
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
    const finder = (found, person) => {
      if (found) return found
      return person.name === newName
    }
    if (persons.reduce(finder, false)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    }

    // Adding person
    setPersons(persons.concat(
      {
        name: newName,
        number: newNumber
      }
    ))
    // Clear inputfields
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchtext} onChange={handleSearchtextChange} />
      <h3>Add new</h3>
      <InputForm onSubmit={handleSubmit} fields={formFields} />
      <h3>Numbers</h3>
      <Contacts persons={persons} searchtext={searchtext} />
    </div>
  )
}

const Filter = ({ value, onChange }) => (
  <div>
    Filter with: <input
      value={value}
      onChange={onChange}
    />
  </div>
)

const InputForm = ({ handleSubmit, fields }) => (
  <form onSubmit={handleSubmit}>
    {
      fields.map(field => (
        <div key={field.name}>
          {field.name}: <input value={field.value}
            onChange={field.handleChange} />
        </div>
      ))
    }
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

const Contacts = ({ persons, searchtext }) => (
  <table>
    <tbody>
      {
        persons.filter(person => person.name.toLowerCase().match(`.*${searchtext.toLowerCase()}.*`))
          .map(person => <Contactline key={person.name} person={person} />)
      }
    </tbody>
  </table>
)

const Contactline = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

export default App
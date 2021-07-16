import React from 'react'

const Contacts = ({ persons, searchtext, handleDelete }) => (
    <table>
      <tbody>
        {
          persons.filter(person => person.name.toLowerCase().match(`.*${searchtext.toLowerCase()}.*`))
            .map(person => <Contactline key={person.name} person={person} handleDelete={handleDelete} />)
        }
      </tbody>
    </table>
  )
  
  const Contactline = ({ person, handleDelete }) => (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleDelete(person.id, person.name)} >Remove</button></td>
    </tr>
  )

  export default Contacts
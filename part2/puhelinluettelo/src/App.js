import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

const Person = ({person, deletePerson}) => {
  return (
    <li>{person.name} {person.number} 
    <Button
    handleClick={deletePerson}
    text='delete'
    />  </li>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const ShowFormat = (props) => {
  return (
  <form onSubmit={props.addPerson}>
  <div>
    name: <input 
    value={props.newName}
    onChange={props.handleNameChange}/>
  </div>
  <div>
    number: <input 
    value={props.newNumber}
    onChange={props.handleNumberChange}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontStyle: 'italic',
      fontSize: 16
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === personObject.name)
    if (found) {return window.alert(`${newName} is already in the phone book`, setNewName(''), setNewNumber(''))
    
      
    } else {
      personService
        .create(personObject)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${personObject.name} was added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(response))
        })
    }
  }

  const Persons = (props) => {
    return (
      props.persons.map(person => 
        <Person key={person.id} 
        person={person}
        deletePerson={() => deletePersonFrom(person.id, person.name)}
        />)
    )
  }

  const deletePersonFrom = (id, name ) => {
    console.log(id)
    personService
    .poista(id).then(() => {
      setErrorMessage(`${name} was deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <ShowFormat addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons}/>
      </ul>
    </div>
  )

}

export default App


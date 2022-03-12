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
  const [filter, setFilter] = useState('')

  console.log(filter)

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
    if (found) {if 
      (window.confirm(`${newName} is already in the phone book, replace the old number with a new one`)) 
      {return (changePhoneNumber(found.id, personObject.number) );} else { console.log('cancel?'); 
    }
      
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


  const Persons = () => {
    const filterPersons = persons.filter((person) => person.name.startsWith(filter))
    return (
      filterPersons.map(person => 
        <Person key={person.id} 
        person={person}
        deletePerson={() => deletePersonFrom(person.id, person.name)}
        />)
    )
  }

  const deletePersonFrom = (id, name ) => {
    personService
    .poista(id).then(() => {
      setErrorMessage(`${name} was deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    }).catch(error => {
      setErrorMessage(`${name} has already been deleted from the server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}

  const changePhoneNumber = (id, newNumber) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = {...person, number: newNumber}

    personService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      alert(
        `the note '${person.name}' was already deleted from server`
      )
      setPersons(persons.filter(n => n.id !== id))
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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with 
      <input value={filter} onChange={handleFilterChange}/>
      <h2>Add new </h2>
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


import { useState, useEffect } from 'react'
import Filter from '/src/components/Filter.jsx'
import Form from '/src/components/Form.jsx'
import Persons from '/src/components/Persons.jsx'
import personsService from '/src/services/persons.js'
import Notification from '/src/components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [newErrorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('') // 'confirmation' or 'error'

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    // Generate a unique id if adding a new person
    let id
    if (existingPerson) {
      id = existingPerson.id
    } else {
      // Find the next available id as a string
      const existingIds = persons.map(person => Number(person.id))
      let nextId = 1
      while (existingIds.includes(nextId)) {
      nextId += 1
      }
      id = nextId.toString()
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: id
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personObject.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setErrorType('confirmation')
            setErrorMessage(`${newName} new number saved to phonebook`)
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 5000)
          })
      }
    } else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorType('confirmation')
          setErrorMessage(`${newName} saved to phonebook`)
          setTimeout(() => {          
            setErrorMessage(null)        
          }, 5000)
          })
        }
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const name = person ? person.name : ''
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }
    console.log(`Deleting person with id: ${id}`)
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorType('error')
        setErrorMessage(`Person '${person.name}' was already removed from the phonebook`)
        setTimeout(() => {
          setErrorMessage(null)        
        }, 5000)
      })
  }

  // Filter persons based on filter input (case-insensitive)
  const personsToShow = newFilter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    : persons

  return (
    <div>
      <Notification message={newErrorMessage} type={errorType}/>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App

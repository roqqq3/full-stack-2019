import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonRemove = (event) => {
    const toRemove = persons.find(i => i.id.toString() === event.target.value.toString())
    if (window.confirm(`Poistetaanko ${toRemove.name}?`)) {
      personService
        .remove(event.target.value)
          .then(removed => {
            setPersons(persons.filter(i => i.id !== toRemove.id))
            showSuccessMessage(`Poistettiin ${toRemove.name}`)
          })
          .catch(error => {
            showErrorMessage(`Henkilö ${toRemove.name} oli jo poistettu`)
            setPersons(persons.filter(i => i.id !== toRemove.id))
          })
    }
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const changePersonNumber = (id) => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .update(id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(i => i.id === id ? returnedPerson : i))
          setNewName('')
          setNewNumber('')
        })
  }

  const addName = (event) => {
    event.preventDefault()
    const found = persons.find(i => i.name === newName)
    if (found !== undefined) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        showSuccessMessage(`Vaihdettiin puhelinnumero henkilöltä ${newName}`)
        changePersonNumber(found.id)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
          .then(returnedPerson => {
            showSuccessMessage(`Lisättiin ${newName}`)
            setNewName('')
            setNewNumber('')
            setPersons(persons.concat(returnedPerson))
          })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification 
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <Filter 
        handleFilterChange={handleFilterChange} 
        newFilter={newFilter}
      />
      <h3>Lisää numero</h3>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addName={addName}
      />
      <h3>Numerot</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handlePersonRemove={handlePersonRemove}
      />
    </div>
  )

}

export default App
import { useState, useEffect } from 'react'
import axios from "axios"
import "./App.css"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/notes"

const App = ({ getPeople }) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState([])

  const hook = () => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    const val = event.target.value
    const val2 = val.charAt(0).toUpperCase() + val.slice(1)
    setNewName(val2)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    const addNewPerson = (details) => {
        personService.create(details).then(data => console.log(data))

        setNotification([`Added ${details.name}`, "notif"])
        setTimeout(() => setNotification([]), 5000)
    }

    const updatePerson = (details) => {
        personService.update({...details, number : newNumber}).then(data => setPersons(persons.concat(data))).catch(error => {setNotification([`Information of ${details.name} has already been removed from server`, "error"])})

        setNotification([`Updated ${details.name}`, "notif"])
        setTimeout(() => setNotification([]), 5000)
    }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber
    }

    const aDuplicate = persons.find(person => person.name === newName && person.number === newNumber)
    const updateAPerson = persons.find(person => person.name === newName)

        aDuplicate
            ? alert(`${newName} is already added to phonebook`)
            : ( updateAPerson
                ? updatePerson(updateAPerson)
                : addNewPerson(personObject)
              )

    setNewName('');
    setNewNumber('');
  }

    const handleDeletion = (name, id) => {
        return () => {
            window.confirm(`Delete ${name}?`) && personService.deleteAll(id).then(data => console.log(data))
        }
    }

  const handleFilterChange = (event) => {
    const val = event.target.value
    const val2 = val.charAt(0).toUpperCase() + val.slice(1)
    setFilter(val2)
  }

  const newPersons = persons.filter(person => person.name.startsWith(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <h3 className={notification[1]}>{notification[0]}</h3>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <div>debug: {newName} {newNumber}</div>

      {persons.length == 0
      ? <h2>Add a new Person</h2>
      : <Persons filter={filter} persons={persons} newPersons={newPersons} handleDeletion={handleDeletion}/>}
    </div>
  )
}

export default App










import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

const Person = ({ person }) => {
  return (
    <>{person.name} {person.number} <button value={person.id}>delete</button><br /></>
  )
}

const Filter = ({ filter, handleClick }) => {
  return (
    <>
      filter shown with
      <input 
        value={filter}
        onChange={handleClick}
      />
    </>
  )
}

const PersonForm = ({ handleSubmit, nameState, numState }) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input
            value={nameState.newName}
            onChange={nameState.handleNameChange}
          />
        </div>
        <div>number: 
          <input 
            value={numState.newNumber}
            onChange={numState.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    personService
      .getAll()
      .then(savedPersons => {
        setPersons(savedPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addNewPerson = (event) => {
    event.preventDefault();

    const isUniqueName = (name) => {
      return persons.every(person => person.name.toLowerCase() !== name.toLowerCase())
    }

    if (isUniqueName(newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')

      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    } else alert(`${newName} is already added to phonebook`)
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
  
    personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== +id))
      })
      .catch(error => {
        alert(
          `'${person.content}' was already deleted from server`
        )
        setPersons(persons.filter(person => person.id !== +id))
      })
  }


  const handleFilterChange = e => setFilter(e.target.value);
  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  const handleDelete = e => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      let id = e.target.value
      let result = window.confirm(`Delete ${persons.find(p => p.id === +id).name} ?`)

      if (result) deletePerson(id)
    }
  }

  const applyFilter = (persons) => {
    if (filter === '') return persons;
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        handleClick={handleFilterChange}
      />

      <h3>add a new</h3>

      <PersonForm
        handleSubmit={addNewPerson}
        nameState={ { newName, handleNameChange } }
        numState={ { newNumber, handleNumberChange } }
      />

      <h3>Numbers</h3>

      <div onClick={handleDelete}>
        <Persons persons={applyFilter(persons)} />
      </div>
    </div>
    )
}

export default App
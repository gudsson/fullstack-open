import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => 
        <Person key={person.id} person={person} />
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
  const [ noticeObj, setNoticeObj ] = useState(null)

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
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
  

  const addNewPerson = (event) => {
    event.preventDefault();

    let personObj = { name: newName, number: newNumber }

    const isUniqueName = (submittedName) => {
      return persons.every(person => person.name.toLowerCase() !== submittedName.toLowerCase())
    }

    if (isUniqueName(newName)) {

      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          displayNotice({
            responseType: 'success',
            message: `Added ${personObj.name}`
          })
          setNewName('')
          setNewNumber('')
        })

    } else {
      let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      let id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
      if (result) {
        personService
          .update(id, personObj)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== +id ? person : updatedPerson))
            displayNotice({
              responseType: 'success',
              message: `Updated ${personObj.name}`
            })
          })
          .catch(error => {
            displayNotice({
              responseType: 'error',
              message: `'${personObj.name}' was already removed from server`
            })

            setPersons(persons.filter(p => p.id !== +id))
          })
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
  
    personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== +id))
      })
      .catch(error => {
        displayNotice({
          responseType: 'error',
          message: `'${person.name}' was already removed from server`
        })
      })
  }

  const displayNotice = ({ responseType, message }) => {
    setNoticeObj({ responseType, message })

    setTimeout(() => {
      setNoticeObj(null)
    }, 5000)
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
      <Notification noticeObj={noticeObj} />

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
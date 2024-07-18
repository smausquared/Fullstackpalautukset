import { useState, useEffect } from 'react'
import services from './services/services'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.search} onChange={props.handler}/>
    </div>
  )
}

const PersonForm = (props) => { // liikaa divtagejä? en oo varma html-käytänteistä :D
  return (
    <div>
      <form onSubmit={props.adder}>
        <div>
          name: <input value={props.name} onChange={props.namehandler}/>
        </div>
        <div>
          number: <input value={props.number} onChange={props.numberhandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Message = (props) => {
  if (props.message === null) {
    return null
  }
  if (props.message[0] === 'I') {
  return (
    <div className="error">
      {props.message}
    </div>
  )} else {
    return (
      <div className="success">
        {props.message}
      </div>
    )
  }
}

const Persons = (props) => {
  return (
    props.shown.map(person => <p key={person.name}>{person.name+' '+person.number}
    <Button handleClick={props.handleClick} person={person}/> </p>)
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.handleClick(props.person)}> delete
    </button>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  let regex = new RegExp('.*'+search.toLowerCase()+'.*') // ei toiminut xd

  const shownNames = search // toimi!
    ? persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    : persons
  
  useEffect(() => {
    console.log('Jipii')
    services
    .getAll().then(people => {
      setPersons(people)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    console.log(person)
    console.log(persons)
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      const existingperson = persons.find((person) => person.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        services
        .updateExisting(existingperson, newNumber)
        .then(updated => {
          setPersons(persons.map(person => person.id !== existingperson.id ? person : updated))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(`Information of '${existingperson.name}' has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== existingperson.id))
        })
      }

    } else {
      services
      .newPerson(person)
      .then(responsePerson => {
        setPersons(persons.concat(responsePerson))
      })
      setNewName('')
      setNewNumber('')
      setMessage(`Added '${person.name}'`)
      setTimeout(() => {
        setMessage(null)
        }, 5000)
    }
  }
  
  const deleteHandler = (person) => {
    if (window.confirm(`Really delete ${person.name}?`)) {
      services
      .deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
          <Message message={message}/>
          <Filter search={search} handler={handleSearchChange}/>
      <h2>Add new</h2>
          <PersonForm adder={addPerson} name={newName} namehandler={handleNameChange} 
          number={newNumber} numberhandler={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons shown={shownNames} handleClick={deleteHandler}/>
    </div>
  )
}

export default App
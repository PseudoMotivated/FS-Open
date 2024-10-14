import { useEffect, useState } from "react";
import personsAPI from './services/persons'
import Notification from "./components/Notification";
const baseURL = 'http://localhost:3001/persons'

const AddPerson = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotification }) => {

  const submitHandler = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personIndex = persons.findIndex(person => person.name === newPerson.name)
    const createPerson = () => {
      personsAPI.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNotification({ content: response.name + " was successfully added." });
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(
          error => {
            setNotification({ type: "error", content: "This person was removed previously. Please refresh." })
            setTimeout(() => setNotification(null), 5000)
          }
        )

    }


    if (personIndex !== -1) {

      if (window.confirm(`${newPerson.name} exists, replace phone number?`)) {
        const updatedPerson = { ...persons[personIndex], number: `${newPerson.number}` }
        personsAPI
          .update(persons[personIndex].id, updatedPerson)
          .then(response => { setNotification({ type: "alert", content: response.name + " has been changed." }); setTimeout(() => setNotification(null), 5000) })
          .catch(error => { setNotification({ type: "error", content: "This person was removed previously. Please refresh." }); setTimeout(() => setNotification(null), 5000) })

        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))

      } else {
        createPerson()
      }
      setNewName('')
      setNewNumber('')

    } else {
      createPerson()
    }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div className="person-form">
      <form onSubmit={submitHandler}>
      <table>
      <tr>
        <td><p>Name:</p></td>
        <td><input placeholder="Joe Mama" value={newName} onChange={event => setNewName(event.target.value)} /></td>
      </tr>
      <tr>
        <td><p>Number:</p></td>
        <td><input placeholder={'73 6942069'} value={newNumber} type="number" onChange={event => setNewNumber(event.target.value)} /></td>
      </tr>
          
          
          
       
         <button type="submit">add</button>
      </table>
      </form>
    </div>);
}

const PersonEntry = ({ deletePerson, person }) => {
  return (
    <div className="person-entry">
      <li>
        {person.name} <br /> {person.number} <br /> <button onClick={() => deletePerson(person)}>Delete</button>
      </li>
    </div>
  );
}

const PersonList = ({ deletePerson, persons, search }) => {
  return (
    <div className="persons-list">
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <PersonEntry key={person.id} deletePerson={deletePerson} person={person} />)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState()

  const hook = () => {
    personsAPI
      .getAll()
      .then(response => setPersons(response))
  }

  useEffect(hook, [])

  const deletePerson = (person) => {
    const id = person.id
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personsAPI
        .forget(id)
        .then(
          setPersons(persons.filter(person => person.id !== id)),
          setNotification({ type: "alert", content: "Person removed" }),
          setTimeout(() => setNotification(null), 5000)
        )
        .catch(error => {
          setNotification({ type: "error", content: "This person was already removed." })
          setTimeout(() => setNotification(null), 5000)
        })

    }
  }


  return (
    <div className="app">
      <h1 className="title">Phonebook</h1>
      <Notification notif={notification} />
      <div className="search">
      Search:<input value={search} onChange={(event) => setSearch(event.target.value)}/>
      </div>
      <AddPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setNotification={setNotification} />
      <PersonList deletePerson={deletePerson} persons={persons} search={search} />
    </div>
  );
};

export default App;
import { useEffect, useState } from "react";
import personsAPI from './services/persons'
const baseURL = 'http://localhost:3001/persons'

const AddPerson = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const submitHandler = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personIndex = persons.findIndex(person => person.name === newPerson.name)
    const createPerson = () => personsAPI.create(newPerson).then(response => setPersons(persons.concat(response)))
    if (personIndex !== -1) {

      if (window.confirm(`${newPerson.name} exists, replace phone number?`)) {
        const updatedPerson = { ...persons[personIndex], number: `${newPerson.number}` }
        personsAPI.update(persons[personIndex].id, updatedPerson)
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


  return (<form onSubmit={submitHandler}>
    <div>
      Name: 
      <input placeholder="Joe Mama" value={newName} onChange={event => setNewName(event.target.value)} />
      <br />
      Number:
      <input placeholder={'73 6942069'} value={newNumber} type="number" onChange={event => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>);
}

const PersonEntry = ({ deletePerson, person}) => {
  return (<li >
    {person.name} <br /> {person.number} <br /> <button onClick={() => deletePerson(person)}>Delete</button>
  </li>);
}

const PersonList = ({deletePerson, persons, search }) => {
  return (<ul>
    {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <PersonEntry key={person.id} deletePerson={deletePerson} person={person} />)}
  </ul>);
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const hook = ()  => {
    personsAPI
    .getAll()
    .then(response => setPersons(response))
  }

  useEffect(hook, [])

  const deletePerson = (person) => {
    const id = person.id
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
    personsAPI
    .forget(id)
    .then(
      setPersons(persons.filter(person => person.id !== id))
    )
  }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      Search:
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <AddPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PersonList deletePerson={deletePerson} persons={persons} search={search} />
      <hr />
    </div>
  );
};

export default App;



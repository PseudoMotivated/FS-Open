import { useEffect, useState } from "react";
import axios from 'axios'

const AddPerson = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const submitHandler = (event) => {
    event.preventDefault();

    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    )
    setNewName('')
    setNewNumber('')
  };


  return (<form onSubmit={submitHandler}>
    <div>
      name:
      <input value={newName} onChange={event => setNewName(event.target.value)} />
      <br />
      num:
      <input value={newNumber} type="number" onChange={event => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>);
}

const PersonEntry = ({ person }) => {
  return (<li >
    {person.name} <br /> {person.number}
  </li>);
}

const PersonList = ({ persons, search }) => {
  return (<ul>
    {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <PersonEntry key={person.id} person={person} />)}
  </ul>);
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const hook = ()  => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }

  useEffect(hook, [])


  return (
    <div>
      <h2>Phonebook</h2>
      search
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <AddPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PersonList persons={persons} search={search} />
      <hr />
    </div>
  );
};

export default App;



const express = require('express')
const app = express()

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "https://firecamp.dev"); // update to match the domain you will make the request from
  response.header("Access-Control-Allow-Origin", "http://firecamp.dev"); // update to match the domain you will make the request from
  response.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // update to match the domain you will make the request from
  response.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(
    ...notes.map(
      n => Number(n.id)  // Takes the notes array and makes it into an array of id's.
    )                    // Then it finds the max. If max is undefined; returns zero.
  )                      // Assigns maxId whatever is returned.
  : 0;
  return String(maxId + 1);
}

app.get('/api/persons' , (request, response) => {
    response.json(persons)
})

app.post('/api/persons' , (request, response) => {
  console.log(request.body)
  person = request.body
  console.log(person)
  person = [
    {
      id: Math.round(Math.random() * 10000 ).toString(),
      name: person.name? person.name : "" ,
      number: person.number? person.number : "0",
    }
  ]
  persons = persons.concat(person)
  console.log(persons)
  response.json(person)
  response.status(200).end()
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  let person = persons.find(person => person.id === id) 
  if (person) {
    response.json(person)
  }else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  let person = persons.find(person => person.id === id) 
  console.log(persons)
  if (person) {
    persons = persons.filter(person => person.id != id)
    console.log(persons)
    response.status(200).end()
  }else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people.</p>
  <p>${Date()}</p>
  `)
})



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})

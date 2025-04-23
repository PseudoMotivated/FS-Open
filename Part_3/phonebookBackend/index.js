const express = require('express')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
var morgan = require('morgan')

morgan.token("postdata", (request, response) => {
  return request.data;
})

// app.use((request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "https://firecamp.dev"); // update to match the domain you will make the request from
//   response.header("Access-Control-Allow-Origin", "http://firecamp.dev"); // update to match the domain you will make the request from
//   response.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // update to match the domain you will make the request from
//   response.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const app = express()
app.use(express.json())
// app.use(requestLogger)
app.use(morgan(':postdata :method :url :status length :res[content-length] - :response-time ms'))
// app.use(unknownEndpoint)


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

app.get('/api/persons' , (request, response) => {
    response.json(persons)
})

app.post('/api/persons' , (request, response) => {
  let person = request.body
  console.log(person)
  // Check has name
  if (!person.name || person.name === ""){
    response.status(400)
    response.json({error:"Must have a name."})
    return
  }
  if (!person.number){
    response.status(400)
    response.json({error:"Must have a number."})
    return
  }

  // Check name unique
  if (
    persons.some(p => p.name === person.name)
  ){
    response.status(400)
    response.json({error:"Name must be unique."})
    return
  }

  person = [
    {
      id: Math.round(Math.random() * 100000 ).toString(),
      name: person.name,
      number: person.number? person.number : "0",
    }
  ]
  persons = persons.concat(person)
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

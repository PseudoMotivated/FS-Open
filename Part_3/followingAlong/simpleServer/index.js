const express = require('express')
const app = express()

// app.use( (request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "https://firecamp.dev"); // update to match the domain you will make the request from
//   // response.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // update to match the domain you will make the request from
//   // response.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(express.json())


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(
    ...notes.map(
      n => Number(n.id)  // Takes the notes array and makes it into an array of id's.
    )                    // Then it finds the max. If max is undefined; returns zero.
  )                      // Assigns maxId whatever is returned.
  : 0;
  return String(maxId + 1);
}
app.post('/api/notes', (request, response) => {
  const body = request.body
console.log(body)
  if (!body.content) {
    return response.status(400).json({
      error: "Content Missin"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }
  console.log(note)
  notes = notes.concat(note)   // Adds note with a one higher id.
  response.json(note)
})

app.get('/', (request, response) => {
  response.send('<h1>hello wolrd</h1>')
})

app.get('/api/notes/', (request, response) => {
  response.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id != id)
  response.status(200).end()
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})

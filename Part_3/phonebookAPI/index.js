const express = require('express')
const app = express();

// Allow cors
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "https://firecamp.dev"); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    response.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  const contacts = [
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

app.get('api/persons', (request, response) => {
        e
})


  
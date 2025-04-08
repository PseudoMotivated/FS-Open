import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteAPI from './services/notes'
import './index.css'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteAPI
    .update(id , changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `${note.content} was already deleted from the server`
        )
        setNotes(notes.filter(note => note.id !== id))
      })
  }


  const hook = () => {
    console.log('effect')
    noteAPI
    .getAll()
      .then(initialNotes => {
        console.log('bobby kept his promise')
        setNotes(initialNotes)
      })
  }

  useEffect(hook, [])


  console.log('rendered', notes.length, 'notes')


  // if showAll return notes, else return only important notes.
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    //    console.log("Button was molested", event.target)
    const noteObject = {
      content: newNote,
      important: false
    }
    
    noteAPI
    .create(noteObject)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    
  }


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => // Arrays returned by map should have keys in them, that are gotten from the original data.
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
           /> // Now the key is in the note element. Not li. Becuase the note elements are now the array returned by map.
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
  // When map produces elements, they must have unique keys.
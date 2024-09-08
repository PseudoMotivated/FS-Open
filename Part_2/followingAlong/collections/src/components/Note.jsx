const Note = ({ note , toggleImportance }) => {
    //console.log(note)
    return (
        <li>
        {note.content} 
        {note.important} <br /> 
        <button onClick={toggleImportance}>
            {note.important? 'Make unimportant' : 'Make important'}
        </button>
        </li>
    )
}

export default Note
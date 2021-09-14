import React from 'react'
import { useNotesStore } from './NotesContext'

function NewNoteForm() {
    const [noteText, setNoteText] = React.useState('')
    const notesStore = useNotesStore()

    return (
        <div classname>
            <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            <button onClick={() => notesStore.addNote(noteText)}>
                Add note
            </button>
        </div>
    )
}

export default NewNoteForm

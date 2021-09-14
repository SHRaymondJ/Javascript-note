import { observer } from 'mobx-react-lite'
import React from 'react'
import { tw } from 'twind'
import TimerView from '../components/TimerView'
import { myTimer } from './timer.mobx.CC'
import NewNoteForm from './NewNoteForm'
import { useNotesStore } from './NotesContext'

const App = observer(() => {
    const notesStore = useNotesStore()
    return (
        <div className={tw`mx-auto flex flex-col items-center text-center`}>
            <TimerView />
            <button
                onClick={() => myTimer.increaseTimer()}
                className={tw`px-4 py-2 border border-red-200 focus:outline-none transition transform active:scale-95 active:bg-red-100`}
            >
                increase
            </button>
            <button
                onClick={() => myTimer.decreaseTimer()}
                className={tw`px-4 py-2 border border-red-200 focus:outline-none transition transform active:scale-95 active:bg-red-100`}
            >
                decrease
            </button>
            <ul>
                {notesStore.notes.map((note) => {
                    return (
                        <li
                            key={note.id}
                            onClick={() => notesStore.removeNote(note.id)}
                        >
                            {note.text}
                        </li>
                    )
                })}
            </ul>
            <NewNoteForm />
        </div>
    )
})

export default App

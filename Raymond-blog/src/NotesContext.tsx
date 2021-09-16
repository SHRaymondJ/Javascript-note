import React, { createContext } from 'react'
import { createNotesStore } from './notesStore'
import { useLocalStore } from 'mobx-react-lite'
import type { INoteStoreProps } from './notesStore'

const NotesContext = createContext({} as INoteStoreProps)

export const NotesProvider: React.FC = ({ children }) => {
    const notesStore = useLocalStore(createNotesStore)
    return (
        <NotesContext.Provider value={notesStore}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotesStore = () => React.useContext(NotesContext)

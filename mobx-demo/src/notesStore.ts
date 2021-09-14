import { nanoid } from 'nanoid'

interface INote {
    text: string
    id: string
}

export interface INoteStoreProps {
    notes: Array<INote>
    addNote: (arg: string) => void
    removeNote: (arg: string) => void
}

export function createNotesStore(): INoteStoreProps {
    return {
        notes: [],
        addNote(text) {
            this.notes.push({
                text,
                id: nanoid(),
            })
        },
        removeNote(id) {
            this.notes = this.notes.filter((note) => note.id !== id)
        },
    }
}

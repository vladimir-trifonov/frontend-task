import { cloneNotes, generateNewNote } from './Notes.utils'

export const getNotesInitialState = () => {
  const note = generateNewNote()
  const notes = [note]
  const matched = cloneNotes(notes)

  return {
    notes,
    matched,
    currentNote: matched[0]
  }
}

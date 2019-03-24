import { cloneNotes, generateNewNote } from './Notes.utils'
import {
  getNotes,
  setNotes,
  hasNotes
} from '../../services'

export const getNotesInitialState = () => {
  let notes
  if (hasNotes()) {
    notes = getNotes()
  } else {
    notes = [generateNewNote()]
    setNotes(notes)
  }
  const matched = cloneNotes(notes)

  return {
    notes,
    matched,
    count: notes.length,
    currentNote: matched[0]
  }
}

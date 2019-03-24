import { cloneNotes, generateNewNote } from './Notes.utils'
import {
  getNotes,
  setNotes,
  hasNotes
} from '../../services'

// Initial state
export const getNotesInitialState = () => {
  let notes

  // Check if there are notes in the localStorage
  if (hasNotes()) {
    // Get the notes from the localStorage
    notes = getNotes()
  } else {
    // If not generate new empty note for starters
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

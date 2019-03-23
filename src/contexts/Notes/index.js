
import React, { useReducer } from 'react'
import { NotesReducer } from './Notes.reducer'
import { getNotesInitialState } from './Notes.state'
import {
  setNotes,
  getNotes,
  addNote,
  hasNotes,
  saveNote,
  deleteNote
} from '../../services'
import { generateNewNote } from './Notes.utils'

const NotesContext = React.createContext()

const NotesProvider = ({ children }) => {
  const [{ currentNote, match, matched }, dispatch] = useReducer(NotesReducer, getNotesInitialState())

  const value = {
    currentNote,
    match,
    notes: matched,
    addNote: () => {
      const note = generateNewNote(match)
      addNote(note)
      dispatch({ type: 'ADD_NOTE', payload: note })
    },
    saveNote: (note) => {
      saveNote(note)
      dispatch({ type: 'SAVE_NOTE', payload: note })
    },
    deleteNote: (noteId) => {
      deleteNote(noteId)
      dispatch({ type: 'DELETE_NOTE', payload: noteId })
    },
    setCurrentNote: (noteId) => dispatch({ type: 'SET_CURRENT_NOTE', payload: noteId }),
    searchNotes: (match) => dispatch({ type: 'SEARCH_NOTES', payload: match })
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

const NotesConsumer = NotesContext.Consumer
export { NotesConsumer, NotesProvider }

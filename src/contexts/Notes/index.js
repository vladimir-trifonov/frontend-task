
import React, { useReducer } from 'react'
import { NotesReducer } from './Notes.reducer'
import { getNotesInitialState } from './Notes.state'
import {
  addNote,
  saveNote,
  deleteNote
} from '../../services'
import { generateNewNote } from './Notes.utils'

const NotesContext = React.createContext()

const NotesProvider = ({ children }) => {
  const [{ currentNote, count, match, matched }, dispatch] = useReducer(NotesReducer, getNotesInitialState())

  const addNewNote = ({ text, notMatch = false } = {}) => {
    const newNote = generateNewNote(text)

    addNote(newNote)
    dispatch({ type: 'ADD_NOTE', note: newNote, notMatch })
  }

  const value = {
    currentNote,
    match,
    notes: matched,
    addNewNote: () => addNewNote({ text: match }),
    saveNote: (note) => {
      saveNote(note)
      dispatch({ type: 'SAVE_NOTE', note: note })
    },
    deleteNote: (noteId) => {
      deleteNote(noteId)
      dispatch({ type: 'DELETE_NOTE', note: noteId })

      if (count === 1 && !match) addNewNote()
    },
    setCurrentNote: (noteId) => dispatch({ type: 'SET_CURRENT_NOTE', note: noteId }),
    searchNotes: (match) => {
      if (count === 0 && !match) addNewNote({ notMatch: true })

      dispatch({ type: 'SEARCH_NOTES', note: match })
    }
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

const NotesConsumer = NotesContext.Consumer
export { NotesConsumer, NotesProvider }

/* global uuidv4 */
import React, { useReducer } from 'react'

const getInitialState = () => {
  const id = uuidv4()
  const notes = [{ label: 'New Note...', text: '', id }]
  return {
    notes,
    matched: notes,
    currentNote: notes[0]
  }
}

const initialState = getInitialState()

function reducer (state, action) {
  let notes
  let matched

  switch (action.type) {
    case 'ADD_NOTE':
      const id = uuidv4()
      notes = [{ label: 'New Note...', text: '', id }, ...state.notes]
      return {
        ...state,
        notes,
        matched: notes,
        currentNote: notes[0]
      }
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: state.notes.find((note) => note.id === action.payload)
      }
    case 'SAVE_NOTE':
      const updated = action.payload
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === updated.id) return updated
          return note
        }),
        currentNote: updated
      }
    case 'DELETE_NOTE':
      matched = state.matched.filter((note) => note.id !== action.payload)
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        matched,
        ...(state.currentNote && state.currentNote.id === action.payload) && { currentNote: matched[0] }
      }
    case 'SEARCH_NOTES':
      if (!action.payload || !state.notes.length) {
        return {
          ...state,
          match: action.payload,
          matched: state.notes,
          currentNote: state.currentNote || state.notes[0]
        }
      }

      matched = state.notes.filter((note) => note.text.match(new RegExp(action.payload, 'gi')))

      return {
        ...state,
        match: action.payload,
        matched,
        ...(state.currentNote
          ? !matched.find((note) => note.id === state.currentNote.id) && { currentNote: matched[0] }
          : { currentNote: matched[0] })
      }
    default:
      throw new Error('Missing Action Handler')
  }
}

const NotesContext = React.createContext()

const NotesProvider = ({ children }) => {
  const [{ currentNote, match, matched }, dispatch] = useReducer(reducer, initialState)

  const value = {
    currentNote,
    match,
    matched,
    addNote: () => dispatch({ type: 'ADD_NOTE' }),
    saveNote: (note) => dispatch({ type: 'SAVE_NOTE', payload: note }),
    deleteNote: (noteId) => dispatch({ type: 'DELETE_NOTE', payload: noteId }),
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

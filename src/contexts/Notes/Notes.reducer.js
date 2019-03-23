import {
  getMatchedNotes,
  updateNote,
  addNote,
  getNote,
  deleteNote,
  cloneNotes
} from './Notes.utils'

export const NotesReducer = (state, action) => {
  let matched

  switch (action.type) {
    case 'ADD_NOTE':
      const note = action.payload
      matched = addNote({ ...note }, state.matched)

      return {
        ...state,
        notes: addNote({ ...note }, state.notes),
        matched,
        currentNote: getNote(matched, note.id)
      }

    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: getNote(state.matched, action.payload)
      }

    case 'SAVE_NOTE':
      const updated = action.payload
      matched = getMatchedNotes(updateNote(state.matched, updated), state.match)

      return {
        ...state,
        notes: updateNote(state.notes, updated),
        matched,
        // If we just updated the current note and it no longer match the
        // current search string then set the first note to be the current note
        currentNote: getNote(matched, updated.id, matched[0])
      }

    case 'DELETE_NOTE':
      matched = deleteNote(state.matched, action.payload)

      return {
        ...state,
        notes: deleteNote(state.notes, action.payload),
        matched,
        // If we just deleted the current note,
        // set the first note to be the current note
        ...(state.currentNote && state.currentNote.id === action.payload) && { currentNote: matched[0] }
      }

    case 'SEARCH_NOTES':
      const currentNoteId = state.currentNote ? state.currentNote.id : null
      matched = !action.payload || !state.notes.length
        ? cloneNotes(state.notes) // On empty search string display all the notes
        : getMatchedNotes(state.notes, action.payload)

      return {
        ...state,
        match: action.payload,
        matched,
        // If there is no current note being active or the current note is not part
        // of the filtered list, then set the first note to be the current note
        currentNote: getNote(matched, currentNoteId, matched[0])
      }

    default:
      throw new Error('Missing Action Handler')
  }
}

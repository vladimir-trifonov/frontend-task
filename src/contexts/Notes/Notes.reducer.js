import {
  getMatchedNotes,
  updateNote,
  addNote,
  getCurrentNote,
  deleteNote,
  cloneNotes
} from './Notes.utils'

export const NotesReducer = (state, action) => {
  let notes
  let matched

  switch (action.type) {
    case 'ADD_NOTE':
      const note = action.note

      notes = addNote({ ...note }, state.notes)
      matched = !action.notMatch ? addNote({ ...note }, state.matched) : state.matched

      return {
        ...state,
        notes,
        matched,
        count: notes.length,
        currentNote: getCurrentNote(matched, note.id)
      }

    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: getCurrentNote(state.matched, action.note)
      }

    case 'SAVE_NOTE':
      const updated = action.note

      notes = updateNote(state.notes, updated)
      matched = getMatchedNotes(updateNote(state.matched, updated), state.match)

      return {
        ...state,
        notes,
        matched,
        count: notes.length,
        // If we just updated the current note and it no longer match the
        // current search string then set the first note to be the current note
        currentNote: getCurrentNote(matched, updated.id, state.currentNote)
      }

    case 'DELETE_NOTE':
      notes = deleteNote(state.notes, action.note)
      matched = deleteNote(state.matched, action.note)

      return {
        ...state,
        notes,
        matched,
        count: notes.length,
        // If we just deleted the current note,
        // set the first note to be the current note
        ...(state.currentNote && state.currentNote.id === action.note) && { currentNote: matched[0] }
      }

    case 'SEARCH_NOTES':
      const currentNoteId = state.currentNote ? state.currentNote.id : null
      matched = !action.note || !state.notes.length
        ? cloneNotes(state.notes) // On empty search string display all the notes
        : getMatchedNotes(state.notes, action.note)

      return {
        ...state,
        match: action.note,
        matched,
        // If there is no current note being active or the current note is not part
        // of the filtered list, then set the first note to be the current note
        currentNote: getCurrentNote(matched, currentNoteId)
      }

    default:
      throw new Error('Missing Action Handler')
  }
}

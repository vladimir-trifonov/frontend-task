import {
  getMatchedNotes,
  generateNewNote,
  updateNote,
  addNote,
  getNote,
  hasNote,
  deleteNote
} from './Notes.utils'

export const NotesReducer = (state, action) => {
  let matched

  switch (action.type) {
    case 'ADD_NOTE':
      const note = generateNewNote(state.match)

      return {
        ...state,
        notes: addNote(note, state.notes),
        matched: addNote(note, state.matched),
        currentNote: note
      }

    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: getNote(state.notes, action.payload)
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
        currentNote: hasNote(matched, updated.id) ? updated : matched[0]
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
      if (!action.payload || !state.notes.length) {
        // On empty search string display all the notes
        return {
          ...state,
          match: action.payload,
          matched: state.notes,
          currentNote: state.currentNote || state.notes[0]
        }
      }

      matched = getMatchedNotes(state.notes, action.payload)

      return {
        ...state,
        match: action.payload,
        matched,
        // If there is no current note being active or the current note is not part
        // of the filtered list, then set the first note to be the current note
        ...(!state.currentNote || !hasNote(matched, state.currentNote.id)) && { currentNote: matched[0] }
      }

    default:
      throw new Error('Missing Action Handler')
  }
}

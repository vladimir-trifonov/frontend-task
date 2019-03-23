/* global uuidv4 */
const getMatchString = (match) => (match || '').trim()
const isNoteMatch = (match) => (note) => !getMatchString(match) || note.text.match(new RegExp(match, 'gi'))
const getNote = (notes, id) => notes.find((note) => note.id === id)
const hasNote = (notes, id) => !!getNote(notes, id)

export const getMatchedNotes = (notes, match) => notes.filter(isNoteMatch(match))
export const cloneNotes = (notes) => [...notes.map((note) => ({ ...note }))]
export const addNote = (note, notes) => [note, ...notes]
export const deleteNote = (notes, id) => notes.filter((note) => note.id !== id)

export const generateNewNote = (match) => ({
  label: getMatchString(match) ? match : 'New Note...',
  text: match || '',
  html: match || '',
  id: uuidv4()
})

export const updateNote = (notes, updated) => notes.map((note) => {
  if (note.id === updated.id) return updated
  return note
})

export const getCurrentNote = (notes, id, currentNote = {}) => {
  if (currentNote.id === id && hasNote(notes, id)) return currentNote
  if (!notes) return
  if (!id && notes) return notes[0]

  return getNote(notes, id) || notes[0]
}

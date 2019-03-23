/* global uuidv4 */
const getMatchString = (match) => (match || '').trim()
const isNoteMatch = (match) => (note) => !getMatchString(match) || note.text.match(new RegExp(match, 'gi'))

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

export const getNote = (notes, id, alternative) => {
  if (id === null || !notes || !notes.length) return alternative
  return notes.find((note) => note.id === id) || alternative
}

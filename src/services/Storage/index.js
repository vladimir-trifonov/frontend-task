/* global localStorage */
export const setNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes))
export const getNotes = () => JSON.parse(localStorage.getItem('notes'))
export const addNote = (note) => setNotes([note, ...getNotes()])
export const hasNotes = () => !!getNotes()

export const saveNote = (updated) => {
  setNotes(getNotes().map((note) => note.id === updated.id ? updated : note))
}

export const deleteNote = (id) => {
  setNotes(getNotes().filter((note) => note.id !== id))
}

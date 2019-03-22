/* global uuidv4 */

export const getNotesInitialState = () => {
  const id = uuidv4()
  const notes = [{ label: 'New Note...', text: '', id }]
  return {
    notes,
    matched: notes,
    currentNote: notes[0]
  }
}

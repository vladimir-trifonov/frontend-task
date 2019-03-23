import React from 'react'
import { Button, Segment } from 'semantic-ui-react'
import styles from './NotesList.module.css'

export default ({
  notes,
  currentNote: { id: currentNodeId } = {},
  setCurrentNote,
  deleteNote
}) => {
  const handleDelete = (id) => (e) => {
    e.stopPropagation()
    deleteNote(id)
  }

  const handleSetCurrent = (id) => () => setCurrentNote(id)

  return <Segment className={styles['notes-list']}>
    {notes && notes.map(({ label, id }) => (
      <Segment
        key={id}
        className={styles.item}
        onClick={handleSetCurrent(id)}
      >
        <label {...(id === currentNodeId && { className: styles.active })}>{label}</label>
        {notes.length > 1 &&
          <Button
            className={styles['delete-button']}
            basic
            circular
            icon='delete'
            onClick={handleDelete(id)}
          />
        }
      </Segment>
    ))}
  </Segment>
}

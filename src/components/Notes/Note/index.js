import React, { useState, useEffect } from 'react'
import { Segment, Form, TextArea } from 'semantic-ui-react'
import styles from './Note.module.css'

export default ({ note, saveNote }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (note) {
      setText(note.text)
    }
  }, [note])

  const generateLabel = (text) => text.length <= 15
    ? text || 'New Note...'
    : `${text.substr(0, 15).trim()}...`

  const handleSaveNote = () => {
    saveNote({
      ...note,
      label: generateLabel(text),
      text
    })
  }

  return (
    <Segment className={styles.note}>
      {note &&
        <Form>
          <TextArea
            value={text}
            onChange={(e, { value }) => setText(value)}
            onBlur={handleSaveNote}
          />
        </Form>
      }
    </Segment>
  )
}

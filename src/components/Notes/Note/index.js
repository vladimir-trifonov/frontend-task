import React, { useState, useEffect } from 'react'
import { Segment, Form, TextArea } from 'semantic-ui-react'
import styles from './Note.module.css'

export default ({ note, saveNote, match }) => {
  const [text, setText] = useState('')
  useEffect(() => {
    note && setText(note.text)
  }, [note])

  return (
    <Segment className={styles.note}>
      {note &&
        <Form>
          <TextArea
            value={text}
            onChange={(e, { value }) => setText(value)}
            onBlur={() => saveNote({
              ...note,
              label: text.length <= 15 ? text : `${text.substr(0, 15).trim()}...`,
              text
            })}
          />
        </Form>
      }
    </Segment>
  )
}

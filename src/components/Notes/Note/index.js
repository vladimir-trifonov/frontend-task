import React, { useState, useEffect } from 'react'
import { Segment, Form } from 'semantic-ui-react'
import { Editor, EditorState, ContentState, Modifier } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import styles from './Note.module.css'

export default ({ note, saveNote }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (note) {
      setEditorState(EditorState.createWithContent(stateFromHTML(note.html)))
    }
  }, [note])

  const generateLabel = (text) => text.length <= 15
    ? text || 'New Note...'
    : `${text.substr(0, 15).trim()}...`

  const handlePastedText = (text) => {
    const pastedBlocks = ContentState.createFromText(text).blockMap
    const newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      pastedBlocks
    )
    setEditorState(EditorState.push(editorState, newState, 'insert-fragment'))
    return true
  }

  const handleSaveNote = () => {
    const editorstate = editorState.getCurrentContent()
    const text = editorstate.getPlainText()
    saveNote({
      ...note,
      label: generateLabel(text),
      text,
      html: stateToHTML(editorstate)
    })
  }

  return (
    <Segment className={styles.note}>
      {note &&
        <Form>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            onBlur={handleSaveNote}
            handlePastedText={handlePastedText}
          />
        </Form>
      }
    </Segment>
  )
}

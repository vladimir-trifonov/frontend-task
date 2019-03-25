import React, { useState, useEffect, useRef } from 'react'
import { Segment } from 'semantic-ui-react'
import {
  Editor,
  EditorState,
  ContentState,
  Modifier
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { generateDecorator, generateLabel } from './Note.utils'
import styles from './Note.module.css'

export default ({ note, match: search, saveNote }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef()

  const updateState = (curentState) => {
    // Highlight the text by search criteria
    curentState = EditorState.set(curentState, { decorator: generateDecorator(search || '') })

    setEditorState(curentState)
  }

  // Show the text of the current note
  useEffect(() => {
    if (note) {
      let curentState = EditorState.createWithContent(stateFromHTML(note.html))
      updateState(curentState)
    }
  }, [note, search])

  const handlePastedText = (text) => {
    const pastedBlocks = ContentState.createFromText(text).blockMap
    let newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      pastedBlocks
    )
    newState = EditorState.push(editorState, newState, 'insert-fragment')
    updateState(newState)
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

  return <Segment className={styles.note}>
    {note &&
      <Editor
        ref={elem => { ref.current = elem }}
        editorState={editorState}
        onChange={updateState}
        onBlur={handleSaveNote}
        handlePastedText={handlePastedText}
      />
    }
  </Segment>
}

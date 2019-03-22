import React from 'react'
import { Segment } from 'semantic-ui-react'
import { NotesConsumer } from '../../contexts'

export default () => {
  return (
    <NotesConsumer>
      {({ notes }) => (
        <Segment>
          {notes && notes.map(({ label }) => (
            <Segment>{label}</Segment>
          ))}
        </Segment>
      )}
    </NotesConsumer>
  )
}

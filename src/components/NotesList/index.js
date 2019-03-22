import React from 'react'
import { Segment } from 'semantic-ui-react'

export default ({ notes }) => {
  return (
    <Segment>
      {notes && notes.map(({ label }) => (
        <Segment>{label}</Segment>
      ))}
    </Segment>
  )
}

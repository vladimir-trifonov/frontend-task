import React from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'
import Search from '../Search'
import { NotesConsumer } from '../../contexts'
import NotesList from '../NotesList'
import Note from '../Note'

export default () => {
  return (
    <NotesConsumer>
      {({ notes }) => (
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Search />
              </Grid.Column>
              <Grid.Column textAlign='right' >
                <Button basic>New</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column width='6'>
                <NotesList notes={notes} />
              </Grid.Column>
              <Grid.Column width='10'>
                <Note />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )}
    </NotesConsumer>
  )
}

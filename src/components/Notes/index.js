import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import Search from '../Search'
import { NotesProvider } from '../../contexts'
import NotesList from '../NotesList'
import Note from '../Note'

export default () => {
  return (
    <NotesProvider>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Search />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width='6'>
              <NotesList />
            </Grid.Column>
            <Grid.Column width='10'>
              <Note />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </NotesProvider>
  )
}

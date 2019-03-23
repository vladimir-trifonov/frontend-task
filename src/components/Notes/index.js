import React from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'
import Search from '../Search'
import { NotesConsumer } from '../../contexts'
import NotesList from './NotesList'
import Note from './Note'

export default () => (
  <NotesConsumer>
    {({
      addNote,
      saveNote,
      deleteNote,
      setCurrentNote,
      currentNote,
      searchNotes,
      match,
      notes
    }) => (
      <Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Search onSearch={searchNotes} />
            </Grid.Column>
            <Grid.Column textAlign='right' >
              <Button basic onClick={addNote} icon='plus' />
            </Grid.Column>
          </Grid.Row>
          {notes.length
            ? <Grid.Row columns={2}>
              <Grid.Column width='6'>
                <NotesList
                  notes={notes}
                  deleteNote={deleteNote}
                  setCurrentNote={setCurrentNote}
                  currentNote={currentNote}
                />
              </Grid.Column>
              <Grid.Column width='10'>
                <Note
                  match={match}
                  note={currentNote}
                  saveNote={saveNote}
                />
              </Grid.Column>
            </Grid.Row>
            : <Grid.Row columns={1}>
              <Grid.Column>
                <Segment>{match ? 'No Results' : 'No Notes'}</Segment>
              </Grid.Column>
            </Grid.Row>
          }
        </Grid>
      </Segment>
    )}
  </NotesConsumer>
)

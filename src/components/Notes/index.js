import React, { PureComponent } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import Search from '../Search'
import NotesList from '../NotesList'
import Note from '../Note'

export default () => {
  return (
    <Segment>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Search />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='6' textAlign='left'>
            <NotesList />
          </Grid.Column>
          <Grid.Column width='10'>
            <Note />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

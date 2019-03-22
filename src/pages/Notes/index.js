import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Notes } from '../../components'
import styles from './Notes.module.css'

export default class extends PureComponent {
  render() {
    return (
      <Grid className={`${styles.main} ui middle aligned`}>
        <Grid.Row>
          <Grid.Column>
            <main className='ui text container segment inverted'>
              <h1>Notes</h1>
              <Notes/>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

import React, { PureComponent } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { Notes } from '../../components'
import styles from './Notes.module.css'

export default class extends PureComponent {
  render() {
    return (
      <Grid verticalAlign='middle' textAlign='center' className={styles.main}>
        <Grid.Row>
          <Grid.Column>
            <Container className='text'>
              <Notes/>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

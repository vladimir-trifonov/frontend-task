import React from 'react'
import { Container } from 'semantic-ui-react'
import Notes from '../Notes'
import { NotesProvider } from '../../contexts'
import styles from './App.module.css'

export default() => <NotesProvider>
  <Container className={`text ${styles.app}`}>
    <Notes />
  </Container>
</NotesProvider>

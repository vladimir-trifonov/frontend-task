
import React, { useState, useEffect } from 'react'

const NotesContext = React.createContext({
  addNote () {},
  notes: []
})

const NotesProvider = ({ children }) => {
  const [notes, addNote] = useState()
  useEffect(() => {
    addNote([{
      label: 'Note 1 Label',
      text: 'Note 1 Text'
    }, {
      label: 'Note 2 Label',
      text: 'Note 2 Text'
    }, {
      label: 'Note 3 Label',
      text: 'Note 3 Text'
    }])
  }, [])

  const value = {
    addNote,
    notes
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

const NotesConsumer = NotesContext.Consumer
export { NotesConsumer, NotesProvider }

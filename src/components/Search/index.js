import React from 'react'
import { Search } from 'semantic-ui-react'

export default ({ onSearch }) => (
  <Search onSearchChange={(e, { value }) => onSearch(value)} />
)

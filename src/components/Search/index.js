import React from 'react'
import { Search } from 'semantic-ui-react'
import debouce from 'lodash.debounce'

export default ({ onSearch }) => (
  <Search open={false} onSearchChange={debouce((e, { value }) => onSearch(value), 300)} />
)

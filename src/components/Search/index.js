import React, { useState, useEffect, useRef } from 'react'
import { Search, Icon } from 'semantic-ui-react'
import debouce from 'lodash.debounce'

export default ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const ref = useRef()

  useEffect(() => {
    ref.current = debouce(onSearch, 300)
  }, [onSearch])

  const handleSearch = (q) => {
    setSearch(q)
    ref.current(q)
  }

  return <Search
    value={search}
    {...search && { icon: <Icon name='delete' link onClick={() => handleSearch('')} /> }}
    open={false}
    onSearchChange={(e, { value }) => handleSearch(value)}
  />
}

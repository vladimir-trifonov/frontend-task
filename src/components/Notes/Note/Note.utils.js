import React from 'react'
import { CompositeDecorator } from 'draft-js'

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText()
  let matchArr, start, end
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    end = start + matchArr[0].length
    callback(start, end)
  }
}

const SearchHighlight = (props) => {
  return <span style={{ backgroundColor: 'yellow' }}>
    {props.children}
  </span>
}

export const generateDecorator = (highlightTerm) => {
  const regex = new RegExp(highlightTerm, 'gi')

  return new CompositeDecorator([{
    strategy: (contentBlock, callback) => {
      if (highlightTerm !== '') {
        findWithRegex(regex, contentBlock, callback)
      }
    },
    component: SearchHighlight
  }])
}

export const generateLabel = (text) => text.length <= 15
  ? text || 'New Note...'
  : `${text.substr(0, 15).trim()}...`

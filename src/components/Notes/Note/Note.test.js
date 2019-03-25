/* global describe, test, expect, beforeEach */
import React from 'react'
import Note from './'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'
import { generateLabel } from './Note.utils'

describe('Note', () => {
  describe('Component', () => {
    test('it matches the snapshot', () => {
      const wrapper = create(<Note />)
      expect(wrapper.toJSON()).toMatchSnapshot()
    })

    describe('Functional testing', () => {
      let note

      beforeEach(() => {
        note = { html: 'Test note', id: 1 }
      })

      test('should render the note\'s editor', () => {
        const wrapper = mount(<Note note={note} />)

        expect(wrapper.find('.DraftEditor-root').length).toEqual(1)
      })

      test('should render the note', () => {
        const wrapper = mount(<Note note={note} />)

        expect(wrapper.find('.public-DraftEditor-content').length).toEqual(1)
        expect(wrapper.find('.public-DraftEditor-content span[data-text="true"]').text()).toContain('Test note')
      })
    })
  })

  describe('Utils', () => {
    test('should generate label', () => {
      expect(generateLabel('Test label')).toEqual('Test label')
      expect(generateLabel('Very long test label')).toEqual('Very long test...')
    })
  })
})

/* global describe, jest, test, expect, beforeEach */
import React from 'react'
import NotesList from './'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

describe('NotesList component', () => {
  test('it matches the snapshot', () => {
    const wrapper = create(<NotesList />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  describe('Functional testing', () => {
    let note
    let notes

    beforeEach(() => {
      note = { label: 'Current note', id: 1 }
      notes = [note, { label: 'Test note', id: 2 }]
    })

    test('should render the notes', () => {
      const wrapper = mount(<NotesList
        notes={notes}
        currentNote={note}
      />)

      expect(wrapper.find('label')).toHaveLength(2)
      expect(wrapper.find('[data-testid="notes-list-note"]').at(1).text()).toContain('Current note')
      expect(wrapper.find('[data-testid="notes-list-note"]').at(2).text()).toContain('Test note')
    })

    test('should invoke deleteNote callback', () => {
      const mockFn = jest.fn()
      const wrapper = mount(<NotesList
        notes={notes}
        currentNote={note}
        deleteNote={mockFn}
      />)

      wrapper.find('button').at(1).simulate('click')

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('should set current note', () => {
      const mockFn = jest.fn()
      const wrapper = mount(<NotesList
        notes={notes}
        currentNote={note}
        setCurrentNote={mockFn}
      />)

      expect(wrapper.find('[data-testid="notes-list-note"]').at(2).text()).toContain('Test note')

      wrapper.find('[data-testid="notes-list-note"]').at(2).simulate('click')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })
})

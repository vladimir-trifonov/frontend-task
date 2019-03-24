/* global describe, jest, test, expect, beforeAll, afterAll */
/* eslint-disable import/first */
import React from 'react'
import Search from './'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

jest.mock('lodash.debounce')
import debouce from 'lodash.debounce'

describe('Search component', () => {
  test('it matches the snapshot', () => {
    const component = create(<Search onSearch={() => {}} />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  describe('Functional testing', () => {
    beforeAll(() => {
      jest.mock('lodash.debounce')
      debouce.mockImplementation(fn => fn)
    })

    afterAll(() => {
      jest.unmock('lodash.debounce')
    })

    test('should invoke the onSearch callback', () => {
      const mockFn = jest.fn()
      const search = mount(<Search onSearch={mockFn} />)

      // manually enters the search text
      search.find('input').simulate('change', { target: { value: 'abc' } })
      expect(mockFn.mock.calls[0][0]).toBe('abc')
    })
  })
})

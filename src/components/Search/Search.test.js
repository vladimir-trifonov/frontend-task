/* global describe, jest, test, expect, beforeAll, afterAll */
/* eslint-disable import/first */
import React from 'react'
import Search from './'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

jest.mock('lodash.debounce')
import debounce from 'lodash.debounce'

describe('Search component', () => {
  test('it matches the snapshot', () => {
    const wrapper = create(<Search onSearch={() => {}} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  describe('Functional testing', () => {
    beforeAll(() => {
      debounce.mockImplementation(fn => fn)
    })

    afterAll(() => {
      jest.unmock('lodash.debounce')
    })

    test('should invoke onSearch callback', () => {
      const mockFn = jest.fn()
      const wrapper = mount(<Search onSearch={mockFn} />)

      // manually enters the search text
      wrapper.find('input').simulate('change', { target: { value: 'abc' } })

      expect(wrapper.find('input').props().value).toBe('abc')
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn.mock.calls[0][0]).toBe('abc')
    })

    test('should clear the search', () => {
      const mockFn = jest.fn()
      const wrapper = mount(<Search onSearch={mockFn} />)

      // manually enters the search text
      wrapper.find('input').simulate('change', { target: { value: 'abc' } })
      wrapper.find('.delete.link').simulate('click')

      expect(wrapper.find('input').props().value).toBe('')
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn.mock.calls[0][0]).toBe('abc')
      expect(mockFn.mock.calls[1][0]).toBe('')
    })
  })
})

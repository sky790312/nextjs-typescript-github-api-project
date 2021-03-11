import React from 'react'
import { render, withProviders } from '@/test/testUtils'
import { Home } from '@/pages/index'
import { setupIntersectionObserverMock } from '@/test/__mocks__/intersectionObserverMock'

beforeEach(() => {
  setupIntersectionObserverMock()
})

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(withProviders(<Home />), {})
    expect(asFragment()).toMatchSnapshot()
  })
})

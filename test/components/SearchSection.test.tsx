import React from 'react'
import { render, withProviders } from '@/test/testUtils'
import { SearchSection } from '@/components/SearchSection'

describe('SearchSection component', () => {
  it('matches snapshot', () => {
    const handleKeyword = () => {
      console.warn('test handleKeyword cb function')
    }
    const { asFragment } = render(
      withProviders(<SearchSection handleKeyword={handleKeyword} />),
      {},
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

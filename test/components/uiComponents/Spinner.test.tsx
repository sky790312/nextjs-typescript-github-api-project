import React from 'react'
import { render, withProviders } from '@/test/testUtils'
import { Spinner } from '@/components/uiComponents/Spinner'

describe('Spinner ui component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(withProviders(<Spinner />), {})
    expect(asFragment()).toMatchSnapshot()
  })
})

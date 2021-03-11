import React from 'react'
import { render, withProviders } from '@/test/testUtils'
import { Item } from '@/components/Item'
import { GithubRepoSchema } from '@/api/schema'

describe('Item component', () => {
  it('matches snapshot', () => {
    const item: GithubRepoSchema = {
      id: 0,
      name: 'test',
      // eslint-disable-next-line @typescript-eslint/camelcase
      html_url: 'test url',
    }
    const { asFragment } = render(withProviders(<Item item={item} />), {})
    expect(asFragment()).toMatchSnapshot()
  })
})

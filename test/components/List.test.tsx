import React from 'react'
import { render, withProviders } from '@/test/testUtils'
import { List } from '@/components/List'
import { GithubRepoSchema } from '@/api/schema'

describe('List component', () => {
  it('matches snapshot', () => {
    const items: GithubRepoSchema[] = [
      {
        id: 0,
        name: 'test',
        // eslint-disable-next-line @typescript-eslint/camelcase
        html_url: 'test url',
      },
    ]
    const { asFragment } = render(withProviders(<List items={items} />), {})
    expect(asFragment()).toMatchSnapshot()
  })
})

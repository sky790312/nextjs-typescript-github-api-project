import React from 'react'
import styled from 'styled-components'
import { GithubRepoSchema } from '@/api/schema'
import { Item } from '@/components/Item'

interface Props {
  items: GithubRepoSchema[]
}

export const List: React.FC<Props> = React.memo(({ items }) => {
  return (
    <ListContainer>
      {items?.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </ListContainer>
  )
})

const ListContainer = styled.div`
  position: relative;
  padding: 50px;
`

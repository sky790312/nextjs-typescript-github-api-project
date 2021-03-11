/* eslint-disable @typescript-eslint/camelcase */
import styled from 'styled-components'
import { GithubRepoSchema } from '@/api/schema'
import Link from 'next/link'

interface Props {
  item: GithubRepoSchema
}

export const Item: React.FC<Props> = ({ item }) => {
  return (
    <ItemContainer>
      <h3>{item.id}</h3>
      <p>
        Name: {item.name} -
        <Link href={item.html_url} passHref={true}>
          <a target='_blank' rel='noreferrer'>
            Link
          </a>
        </Link>
      </p>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  padding: 20px;
  cursor: default;
  background-color: ${props => props.theme.colors.gray};

  &:hover {
    opacity: 0.7;
  }
`

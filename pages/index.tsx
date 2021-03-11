import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Container, TextCenterContainer } from '@/GlobalStyles'
import { SearchSection } from '@/components/SearchSection'
import { List } from '@/components/List'
import { Spinner } from '@/components/uiComponents/Spinner'
import { fetchGithubRepo } from '@/api'
import {
  FetchGithubRepoParams,
  FetchGithubRepoRespSchema,
  GithubRepoSchema,
} from '@/api/schema'
import {
  DEFAULT_PER_PAGES,
  AUTO_LOAD_MORE_DELAY_TIME,
  DEBOUNCE_DELAY_TIME,
} from '@/constants'
import { isClient, debounce } from '@/utils'

export const Home = React.memo(
  (): JSX.Element => {
    const [repos, setRepos] = useState<GithubRepoSchema[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const page = useRef(0)
    const keyword = useRef('')

    const [element, setElement] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const prevY = useRef(0)

    const perPages = DEFAULT_PER_PAGES
    const debounceDelayTime = DEBOUNCE_DELAY_TIME

    const observer = useRef(
      isClient() &&
        new IntersectionObserver(
          entries => {
            const firstEntry = entries[0]
            const y = firstEntry.boundingClientRect.y

            if (prevY.current > y) {
              setTimeout(() => loadMore(), AUTO_LOAD_MORE_DELAY_TIME)
            }

            prevY.current = y
          },
          { threshold: 0 },
        ),
    )

    useEffect(() => {
      const currentElement = element
      const currentObserver = observer.current

      if (currentElement) {
        currentObserver.observe(currentElement)
      }

      return () => {
        if (currentElement) {
          currentObserver.unobserve(currentElement)
        }
      }
    }, [element])

    const fetchData = useCallback(async () => {
      setIsLoading(true)
      try {
        const payload: FetchGithubRepoParams = {
          q: keyword.current,
          page: page.current,
          // eslint-disable-next-line @typescript-eslint/camelcase
          per_page: perPages,
        }
        const data: FetchGithubRepoRespSchema = await fetchGithubRepo(payload)
        setIsLoading(false)
        return { data }
      } catch (error) {
        setIsLoading(false)
        return { hasError: true }
      }
    }, [perPages])

    const loadMore = async () => {
      if (isLoading) {
        return
      }

      if (page.current < totalPages) {
        return
      }

      page.current++
      const { data, hasError } = await fetchData()
      if (hasError) {
        return
      }

      setRepos(prevRepos => [...prevRepos, ...data.items])
    }

    const handleKeyword = useCallback(
      debounce(async (newKeyword: string) => {
        keyword.current = newKeyword
        page.current = 1

        const { data, hasError } = await fetchData()
        if (hasError) {
          return
        }

        setRepos(data.items)
        const pages = Math.ceil(data.total_count / DEFAULT_PER_PAGES)
        setTotalPages(pages)
      }, debounceDelayTime),
      [fetchData],
    )

    return (
      <>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Container>
          <SearchSection handleKeyword={handleKeyword} />
          <List items={repos} />
          <LoadingContainer
            ref={setElement}
            shouldHide={page.current >= totalPages}
          >
            {isLoading && <Spinner />}
            <Button disabled={isLoading}>Load More</Button>
          </LoadingContainer>
        </Container>
      </>
    )
  },
)

export default Home

const LoadingContainer = styled(TextCenterContainer)<{ shouldHide: boolean }>`
  position: relative;
  padding: 10px;
  visibility: ${props => (props.shouldHide ? 'hidden' : 'visible')};
`

const Button = styled.button<{ disabled: boolean }>`
  opacity: ${props => (props.disabled ? '0.3' : '1')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`

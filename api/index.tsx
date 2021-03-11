import { FetchGithubRepoParams } from '@/api/schema'

export const baseUrl = 'https://api.github.com'

export const fetchGithubRepo = async (params: FetchGithubRepoParams) => {
  const url = new URL(`${baseUrl}/search/repositories`)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  return await fetch(String(url), {
    method: 'GET',
  }).then(response => {
    if (!response.ok) {
      throw response
    }

    return response.json()
  })
}

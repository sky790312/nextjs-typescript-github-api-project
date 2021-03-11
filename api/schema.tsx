export interface FetchGithubRepoParams {
  q: string
  sort?: string
  order?: string
  per_page?: number
  page?: number
}

export interface FetchGithubRepoRespSchema {
  incomplete_results: boolean
  total_count: number
  items: GithubRepoSchema[]
}

export interface GithubRepoSchema {
  id: number
  name: string
  html_url: string
}

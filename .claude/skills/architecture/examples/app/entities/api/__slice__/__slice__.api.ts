import { restApiFetcher } from '@/pkg/rest-api'

import type { I<Entity>List } from '@/app/entities/models'

// interface
interface IProps {
  page: number
  limit: number
  signal: AbortSignal
}

// fetcher
export const get<Entity>List = async (props: Readonly<IProps>) => {
  const { page, limit, signal } = props

  const res = await restApiFetcher
    .get<I<Entity>List>(`<resource>?_page=${page}&_limit=${limit}`, {
      signal,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    })
    .json()

  // return
  return { data: res, meta: { total: res.length } }
}

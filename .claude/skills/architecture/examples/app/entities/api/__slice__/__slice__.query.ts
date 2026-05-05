import { queryOptions, useQuery } from '@tanstack/react-query'

import { get<Entity>List } from './__slice__.api'

// query options
export const <entity>ListQueryOptions = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['<entity>', page, limit],
    queryFn: ({ signal }) => get<Entity>List({ page, limit, signal }),
    staleTime: 60 * 60 * 1000,
  })
}

// hook
export const use<Entity>ListQuery = (page: number, limit: number) => {
  // return
  return useQuery(<entity>ListQueryOptions(page, limit))
}

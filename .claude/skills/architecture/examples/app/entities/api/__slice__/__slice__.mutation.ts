import { useMutation, useQueryClient } from '@tanstack/react-query'

import { restApiFetcher } from '@/pkg/rest-api'

import type { I<Entity> } from '@/app/entities/models'

// interface
interface IProps {
  title: string
}

// fetcher
const create<Entity> = async (props: Readonly<IProps>) => {
  // return
  return restApiFetcher.post<I<Entity>>('<resource>', { json: props }).json()
}

// hook
export const useCreate<Entity>Mutation = () => {
  const queryClient = useQueryClient()

  // return
  return useMutation({
    mutationFn: create<Entity>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['<entity>'] })
    },
  })
}

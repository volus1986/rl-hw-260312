import type { I<Entity>List } from '@/app/entities/models'

// service
export const sliceService = {
  // normalize
  normalize: (data: I<Entity>List | undefined) => {
    if (!data) return []
    // return
    return data.map((item) => ({ id: item.id, title: item.title }))
  },
}

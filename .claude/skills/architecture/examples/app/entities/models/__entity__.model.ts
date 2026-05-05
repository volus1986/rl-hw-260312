import { z } from 'zod'

// schema
export const S<Entity>Res = z.object({
  id: z.string(),
  title: z.string(),
})

// inferred type
export type T<Entity>Res = z.infer<typeof S<Entity>Res>

// list interface
export interface I<Entity> {
  id: number
  title: string
}

export interface I<Entity>List extends Array<I<Entity>> {}

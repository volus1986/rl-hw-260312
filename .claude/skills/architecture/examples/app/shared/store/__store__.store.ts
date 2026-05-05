import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IEntity } from '../interfaces'

// state shape
interface IStoreState {
  entity: IEntity | null
  setEntity: (entity: IEntity) => void
  clear: () => void
}

// store
export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      entity: null,
      setEntity: (entity) => set({ entity }),
      clear: () => set({ entity: null }),
    }),
    { name: '<store-name>', version: 1 },
  ),
)

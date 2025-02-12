import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware' // required for devtools typing

interface GlobalState {
  expandedPlayer: boolean
  setExpandedPlayer: (expandedPlayer: boolean) => void
}

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        expandedPlayer: false,
        setExpandedPlayer: (expandedPlayer) => set({ expandedPlayer })
      }),
      {
        name: 'global-storage'
      }
    )
  )
)

export default useGlobalStore

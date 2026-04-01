import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Actions, States, LocalStore } from './actions.js'
const useStore = create(
  devtools( 
    persist((set, get) => ({
        ...States(),
        ...Actions(set, get),
      }),
      {
        name: 'app-storage',
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => LocalStore.includes(key))),
      }
    )
  )
)
export default useStore 
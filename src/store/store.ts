import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import todoApi from '@/api/todo'
import authApi from '@/api/auth'

export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      [todoApi.reducerPath]: todoApi.reducer,
      [authApi.reducerPath]: authApi.reducer
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware).concat(authApi.middleware)
  })
}

const store = setupStore()

setupListeners(store.dispatch)

export default store

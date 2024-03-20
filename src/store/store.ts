import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'

import todoApi from '@/api/todo'
import authApi from '@/api/auth'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware).concat(authApi.middleware)
})
setupListeners(store.dispatch)

export default store

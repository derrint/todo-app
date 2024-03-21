import React from 'react'
import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { setupStore } from '@/store/store'

export const renderWithProviders = (
  ui: any,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  setupListeners(store.dispatch)

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

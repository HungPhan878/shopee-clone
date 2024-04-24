/* eslint-disable prettier/prettier */
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { AppProvider, getInitialAppContext } from 'src/contexts/app.context'

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

// test không cần dùng waitfor dùng delay + screen.debug là ok rồi.

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return Provider
}

const Provider = createWrapper()

export function renderWithHistory({ route = '/' } = {}) {
  window.history.pushState({}, 'test page', route)
  const defaultValueAppContext = getInitialAppContext()
  return {
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValueAppContext}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    ),
    user: userEvent.setup()
  }
}

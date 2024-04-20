import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

// css
import 'react-toastify/dist/ReactToastify.css'

// components
import { useRouteElements } from './hooks'
import { localStorageEventTarget } from './utils/auth'
import { AppProvider, AppContext } from './contexts/app.context.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 0
    }
  }
})

function App() {
  const routerElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('removeLS', reset)

    return () => localStorageEventTarget.removeEventListener('removeLS', reset)
  }, [reset])
  return (
    // Chuyển hết qua file app để khi cần thì dùng đến helmet hay các component bọc bên ngoài content của app để test
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AppProvider>
          <ErrorBoundary>
            {routerElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

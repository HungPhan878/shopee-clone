import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// css
import 'react-toastify/dist/ReactToastify.css'

// components
import { useRouteElements } from './hooks'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

function App() {
  const routerElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('removeLS', reset)

    return () => localStorageEventTarget.removeEventListener('removeLS', reset)
  }, [reset])
  return (
    // Chuyển hết qua file app để khi cần thì dùng đến helmet hay các component bọc bên ngoài content của app để test
    <HelmetProvider>
      <ErrorBoundary>
        {routerElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App

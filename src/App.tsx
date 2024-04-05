import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'

// css
import 'react-toastify/dist/ReactToastify.css'

// components
import { useRouteElements } from './hooks'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routerElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('removeLS', reset)

    return () => localStorageEventTarget.removeEventListener('removeLS', reset)
  }, [reset])
  return (
    <>
      <div>
        {routerElements}
        <ToastContainer />
      </div>
    </>
  )
}

export default App

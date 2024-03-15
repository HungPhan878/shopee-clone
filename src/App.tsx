import { ToastContainer } from 'react-toastify'

// css
import 'react-toastify/dist/ReactToastify.css'

// components
import useRouteElements from './hooks/useRouteElements'

function App() {
  const routerElements = useRouteElements()
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

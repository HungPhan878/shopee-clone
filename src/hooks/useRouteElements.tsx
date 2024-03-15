import { useRoutes } from 'react-router-dom'

// components
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Resgister/Register'
import RegisterLayout from 'src/Layouts/RegisterLayout'
import MainLayout from 'src/Layouts/MainLayout'

export default function useRouteElements() {
  const routerElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routerElements
}

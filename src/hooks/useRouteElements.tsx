/* eslint-disable prettier/prettier */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { lazy, useContext, Suspense } from 'react'

// components
// import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
// import Register from 'src/pages/Register'
import RegisterLayout from 'src/Layouts/RegisterLayout'
import MainLayout from 'src/Layouts/MainLayout'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/auth'
// import ProductDetail from 'src/pages/ProductDetail'
// import Cart from 'src/pages/Cart'
import CartLayout from 'src/Layouts/CartLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
// import ChangePurchase from 'src/pages/User/pages/ChangePassword'
// import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
// import ProfileUser from 'src/pages/User/pages/ProfileUser'
// import NotFound from 'src/pages/NotFound'

const Login = lazy(() => import('src/pages/Login'))
const Cart = lazy(() => import('src/pages/Cart'))
const Register = lazy(() => import('src/pages/Register'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(
  () => import('src/pages/User/pages/HistoryPurchase')
)
const ProfileUser = lazy(() => import('src/pages/User/pages/ProfileUser'))
const NotFound = lazy(() => import('src/pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routerElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        },
        {
          path: path.product,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        }
      ]
    },
    {
      path: path.home,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <ProfileUser />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: path.home,
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routerElements
}

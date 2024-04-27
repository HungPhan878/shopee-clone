import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

// components

import Header from 'src/Components/Header'
import Footer from 'src/Components/Footer'

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  console.log('main layout')
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout

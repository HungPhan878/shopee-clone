import React, { memo } from 'react'
import RegisterHeader from '../Components/RegisterHeader'
import Footer from 'src/Components/Footer'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  console.log('register')
  return (
    <div>
      <RegisterHeader />
      <main>{children}</main>
      <Outlet />
      <Footer />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)
export default RegisterLayout

import React from 'react'
import CartHeader from '../Components/CartHeader'
import Footer from 'src/Components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

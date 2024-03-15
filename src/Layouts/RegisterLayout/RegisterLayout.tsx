import React from 'react'
import RegisterHeader from '../Components/RegisterHeader'
import Footer from 'src/Components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

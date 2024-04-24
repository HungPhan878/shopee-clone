/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom'
import NavUser from '../../components/NavUser'
import { Helmet } from 'react-helmet-async'

export default function RegisterLayout() {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <Helmet>
        <title>Shopee Clone | Thông Tin Cá Nhân</title>
        <meta
          name='description'
          content='Vào Trang Thông Tin Cá Nhân Của Shopee Clone'
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <NavUser />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

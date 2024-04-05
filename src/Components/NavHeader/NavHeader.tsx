/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'

// components
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/auth'
import authApi from 'src/apis/auth.api'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { purchasesStatus } from 'src/constants/purchases'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, profile } =
    useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutAccountMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  // handler function
  const handleLogoutAccount = () => {
    logoutAccountMutation.mutate()
  }

  return (
    <div className='flex justify-end text-while'>
      {/* Language */}
      <Popover
        className='flex items-center py-1 cursor-pointer hover:opacity-90'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28 pl-3 text-black'>
              <button className='py-2 px-3 text-left hover:text-orange'>
                Tiếng Việt
              </button>
              <button className='mt-2 py-2 px-3 text-left hover:text-orange'>
                English
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Vietnamese</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Popover>

      {/* account */}
      {isAuthenticated && (
        <Popover
          className='ml-4 flex items-center py-1 cursor-pointer hover:opacity-90'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                My Account
              </Link>
              <Link
                to='/'
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                My Order
              </Link>
              <button
                onClick={handleLogoutAccount}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Log Out
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img
              src='https://cf.shopee.vn/file/vn-50009109-edc81af5e63d0fe77d3505ee4f1d8f32_xhdpi'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className=''>{profile?.email}</div>
        </Popover>
      )}

      {/* account khi chua login */}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link
            to={path.register}
            className='mx-3 capitalize hover:text-white/70'
          >
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </div>
  )
}

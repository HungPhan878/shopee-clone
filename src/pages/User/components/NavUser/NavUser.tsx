/* eslint-disable prettier/prettier */
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'

// components
import { path } from 'src/constants/auth'

export default function NavUser() {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={path.profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src='https://th.bing.com/th/id/OIP.Z-vfTZPXyrE9p8PCY1FB8AHaEn?w=338&h=180&c=7&r=0&o=5&pid=1.7'
            alt='Porche'
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4 truncate'>
          <div className='mb-1  font-semibold text-gray-600 truncate'>
            HungPhan@gmail.com
          </div>
          <Link
            to={path.profile}
            className='flex items-center capitalize text-gray-500'
          >
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize  transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full'
            />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center  capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-full w-full'
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
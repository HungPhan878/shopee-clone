import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { omit } from 'lodash'
/* eslint-disable prettier/prettier */

// components
import { sortBy } from 'src/constants/product'
import { path } from 'src/constants/auth'
import { ProductListConfig } from 'src/types/product.type'
import { order as orderContants } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface SortProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: SortProps) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const page = Number(queryConfig.page)

  // handle function
  const isActiveSort = (
    sortByValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    return sort_by === sortByValue
  }

  const handleSort = (
    sortByValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleSortFollowOrder = (
    orderByValue: Exclude<ProductListConfig['order'], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderByValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              ' bg-orange text-white hover:bg-orange/80': isActiveSort(
                sortBy.view
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(
                sortBy.view
              )
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ Biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              ' bg-orange text-white hover:bg-orange/80': isActiveSort(
                sortBy.createdAt
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(
                sortBy.createdAt
              )
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              ' bg-orange text-white hover:bg-orange/80': isActiveSort(
                sortBy.sold
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(
                sortBy.sold
              )
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            name=''
            id=''
            value={order || ''}
            className={classNames(
              'h-8 px-4 text-left text-sm capitalize outline-none cursor-pointer',
              {
                ' bg-orange text-white hover:bg-orange/80': isActiveSort(
                  sortBy.price
                ),
                'bg-white text-black hover:bg-slate-100': !isActiveSort(
                  sortBy.price
                )
              }
            )}
            onChange={(event) =>
              handleSortFollowOrder(
                event.target.value as Exclude<
                  ProductListConfig['order'],
                  undefined
                >
              )
            }
          >
            <option value='' className='bg-white text-black' disabled>
              Giá
            </option>
            <option value={orderContants.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderContants.desc} className='bg-white text-black'>
              Giá: Cao đến Thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>

          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 opacity-30 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/50 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 opacity-30 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/50 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

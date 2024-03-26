/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'

// components
import { Product } from 'src/types/product.type'
import ProductRating from 'src/Components/ProductRating'
import { path } from 'src/constants/auth'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface ProductItemProps {
  data: Product
}

export default function ProductItem({ data }: ProductItemProps) {
  return (
    <Link to={`${path.home}${data._id}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={data.image}
            alt={data.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>

        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{data.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>
                {formatCurrency(data.price_before_discount)}
              </span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatCurrency(data.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            {/* rating */}
            <ProductRating rating={data.rating} />

            <div className='ml-2 text-sm'>
              <span className='lowercase'>
                {formatNumberToSocialStyle(data.sold)}
              </span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
          <div className='mt-4'>
            <span className='text-sm text-gray-500'>US-UK</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* eslint-disable prettier/prettier */
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { omit } from 'lodash'
import { ObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

// Components
import { path } from 'src/constants/auth'
import Button from 'src/Components/Button'
import { Category } from 'src/types/category'
import InputNumber from 'src/Components/InputNumber'
import { schema, schemaType } from 'src/utils/rules'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface AsideFilterProps {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<schemaType, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({
  categories,
  queryConfig
}: AsideFilterProps) {
  const { t } = useTranslation(['home'])
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    // watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  })
  const navigate = useNavigate()

  // const valueForm = watch()
  // console.log(errors)

  // handler Function
  const isActive = (categoryId: string) => {
    return category === categoryId
  }

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, [
          'price_min',
          'price_max',
          'rating_filter',
          'category'
        ])
      ).toString()
    })
  }

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  return (
    <div className='py-4 h-full'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories &&
          categories.map((categoryItem) => {
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', {
                    'text-orange font-semibold': isActive(categoryItem._id)
                  })}
                >
                  {isActive(categoryItem._id) && (
                    <svg
                      viewBox='0 0 4 7'
                      className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'
                    >
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
      </ul>

      {/* Bo loc tim kiem */}
      <Link
        to={path.home}
        className='mt-4 flex items-center font-bold uppercase'
      >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('aside filter.filter search')}
      </Link>
      <div className='my-4'>
        <div className='py-5'>
          <div>Khoảng giá</div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      // name='text'
                      className='grow'
                      placeholder='₫ TỪ'
                      classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              />
              {/* <InputV2
                control={control}
                name='price_min'
                type='number'
                className='grow'
                placeholder='₫ TỪ'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                classNameError='hidden'
                // {...field}
                onChange={() => {
                  trigger('price_max')
                }}
              /> */}

              <div className='mx-2 mt-2 shrink-0'>-</div>

              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      className='grow'
                      placeholder='₫ ĐẾN'
                      classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>

            <div className='text-red-600 text-sm h-5 text-center'>
              {errors.price_min?.message}
            </div>

            <Button className=' mt-5 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
              Áp Dụng
            </Button>
          </form>
        </div>

        <div className='my-4 h-[1px] bg-gray-300' />

        <div className='text-sm'>Đánh giá</div>

        <RatingStars queryConfig={queryConfig} />

        <div className='my-4 h-[1px] bg-gray-300' />

        <Button
          onClick={handleRemoveAll}
          className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}

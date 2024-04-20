/* eslint-disable prettier/prettier */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

// components
import ProductRating from 'src/Components/ProductRating'
import productApi from 'src/apis/product.api'
import { Product, ProductListConfig } from 'src/types/product.type'
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale
} from 'src/utils/utils'
import { ProductItem } from '../ProductList/Components'
import QuantityController from 'src/Components/QuantityController'
import purchasesApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchases'
import { path } from 'src/constants/auth'
import { useTranslation } from 'react-i18next'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const [buyCount, setBuyCount] = useState<number>(1)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation('product')

  // get product item
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductItem(id as string)
  })

  const productItemData = data?.data.data
  const queryConfig = {
    limit: '10',
    page: '1',
    category: productItemData?.category._id
  }

  // get products follow category
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productItemData)
  })

  const purchasesAddToCartMutation = useMutation({
    mutationFn: purchasesApi.addToCart
  })

  const productsCategory = productsData?.data.data.products

  useEffect(() => {
    if (productItemData && productItemData.images.length > 0) {
      setActiveImage(productItemData.images[0])
    }
  }, [productItemData])

  //  handler function
  const currentImages = useMemo(
    () =>
      productItemData
        ? productItemData?.images.slice(...currentIndexImages)
        : [],
    [currentIndexImages, productItemData]
  )

  const handleChooseImage = (img: string) => {
    setActiveImage(img)
  }

  const handleNextImage = () => {
    if (currentIndexImages[1] < (productItemData as Product).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handlePrevImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoomImage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // b1: tạo ra image từ useRef và lấy ra kích thước gốc của img
    // và set kich thước cho img khi hover và cho overflow hidden vào div để khỏi vượt ra thẻ cha của nó
    const rect = event.currentTarget.getBoundingClientRect()
    // lấy ra kích thước thẻ div từ rect
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    // natural là kích thước gốc của thẻ img
    const { offsetX, offsetY } = event.nativeEvent
    // đây là kich thước X và Y tọa độ của thể div khi hover vào

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    // b2: tính ra kich thước của thẻ điv và set cho thẻ con top và left để khi hover vào tự no di chuyển
    // b3:nhớ cho pointer-event-none vào thẻ img để tránh hiện tượng nổi bọt nha.

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveImage = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    purchasesAddToCartMutation.mutate(
      {
        buy_count: buyCount,
        product_id: productItemData?._id as string
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
        }
      }
    )
  }

  const handleBuyNow = async () => {
    const res = await purchasesAddToCartMutation.mutateAsync({
      buy_count: buyCount,
      product_id: productItemData?._id as string
    })
    const purchase = res.data.data

    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!productItemData) return null

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Shopee Clone | {productItemData.name}</title>
        <meta
          name='description'
          content={convert(productItemData.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>

      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleRemoveImage}
              >
                <img
                  src={activeImage}
                  alt={productItemData.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover pointer-events-none'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>

                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={img}
                      onMouseEnter={() => handleChooseImage(img)}
                    >
                      <img
                        src={img}
                        alt={productItemData.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && (
                        <div className='absolute inset-0 border-2 border-orange' />
                      )}
                    </div>
                  )
                })}

                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNextImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>
                {productItemData.name}
              </h1>

              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>
                    {productItemData.rating}
                  </span>
                  <ProductRating
                    rating={productItemData.rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(productItemData.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>

              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{formatCurrency(productItemData.price_before_discount)}
                </div>
                <div className='ml-3 text-3xl font-medium text-orange'>
                  ₫{formatCurrency(productItemData.price)}
                </div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(
                    productItemData.price_before_discount,
                    productItemData.price
                  )}{' '}
                  giảm
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>

                {/* Quantity Controller */}
                <QuantityController
                  value={buyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={productItemData.quantity}
                />

                <div className='ml-6 text-sm text-gray-500'>
                  {productItemData.quantity} {t('available')}
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line
                        fill='none'
                        strokeLinecap='round'
                        strokeMiterlimit={10}
                        x1='7.5'
                        x2='10.5'
                        y1={7}
                        y2={7}
                      />
                      <line
                        fill='none'
                        strokeLinecap='round'
                        strokeMiterlimit={10}
                        x1={9}
                        x2={9}
                        y1='8.5'
                        y2='5.5'
                      />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>

                <button
                  className='flex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>
              Mô tả sản phẩm
            </div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(productItemData.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
            {productsCategory &&
              productsCategory.map((product) => {
                // console.log(product)
                return (
                  <div className='col-span-1' key={product._id}>
                    <ProductItem data={product} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

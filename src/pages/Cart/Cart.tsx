/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react'
import { produce } from 'immer'
import { keyBy } from 'lodash'

// components
import QuantityController from 'src/Components/QuantityController'
import Button from 'src/Components/Button'
import purchasesApi from 'src/apis/purchase.api'
import { path } from 'src/constants/auth'
import { purchasesStatus } from 'src/constants/purchases'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { Purchases } from 'src/types/purchase.type'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noproduct from '../../assets/images/no-product.png'

export default function Cart() {
  const { extensionPurchases, setExtensionPurchases } = useContext(AppContext)

  // use Query
  const { data: purchasesDataInCart, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchasesMutate = useMutation({
    mutationFn: purchasesApi.updatePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchasesMutate = useMutation({
    mutationFn: purchasesApi.deletePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchasesMutate = useMutation({
    mutationFn: purchasesApi.buyPurchases,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const purchasesData = purchasesDataInCart?.data.data
  const location = useLocation()
  const choosePurchase = (location.state as { purchaseId: string } | null)
    ?.purchaseId

  useEffect(() => {
    setExtensionPurchases((prev) => {
      const extentedPurchasesObj = keyBy(prev, '_id')
      return (
        purchasesData?.map((purchase) => {
          const isChoosePurchase = choosePurchase === purchase._id

          return {
            ...purchase,
            checked:
              isChoosePurchase ||
              Boolean(extentedPurchasesObj[purchase._id]?.checked),
            // de khi refresh lai purchasesData va call lai useEffect thi khong bi mat di checked.
            // checked: false,
            disabled: false
          }
        }) || []
      )
    })
  }, [purchasesData, choosePurchase, setExtensionPurchases])

  useEffect(() => {
    return () => history.replaceState(null, '')
  }, [])

  const isAllChecked = useMemo(
    () => extensionPurchases?.every((purchase) => purchase.checked),
    [extensionPurchases]
  )
  const checkedPurchases = useMemo(
    () => extensionPurchases.filter((purchase) => purchase.checked),
    [extensionPurchases]
  )
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchasesSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) *
            current.buy_count
        )
      }, 0),
    [checkedPurchases]
  )

  // handler function
  const handleChecked =
    (purchasesIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtensionPurchases(
        produce((draft) => {
          draft[purchasesIndex].checked = event.target.checked
        })
      )
    }

  const handleAllChecked = () => {
    setExtensionPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuantity = (
    purchasesIndex: number,
    value: number,
    enabled: boolean
  ) => {
    if (enabled) {
      const purchase = extensionPurchases[purchasesIndex]

      setExtensionPurchases(
        produce((draft) => {
          draft[purchasesIndex].disabled = true
        })
      )

      updatePurchasesMutate.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (purchasesIndex: number) => (value: number) => {
    setExtensionPurchases(
      produce((draft) => {
        draft[purchasesIndex].buy_count = value
      })
    )
  }

  const handleDeleteProductFromCart = (purchaseIndex: number) => {
    const purchaseId = extensionPurchases[purchaseIndex]._id

    deletePurchasesMutate.mutate([purchaseId])
  }

  const handleDeleteProductsFromCart = () => {
    const purchasesId = checkedPurchases.map((purchase) => purchase._id)

    deletePurchasesMutate.mutate(purchasesId)
  }

  const handleBuyProductsFromCart = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))

      buyPurchasesMutate.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extensionPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          checked={isAllChecked}
                          className='h-5 w-5 accent-orange cursor-pointer'
                          onChange={handleAllChecked}
                        />
                      </div>
                      <div className='flex-grow text-black cursor-pointer'>
                        Sản phẩm
                      </div>
                    </div>
                  </div>

                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>

                {extensionPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extensionPurchases?.map((purchasesItem, index) => (
                      <div key={purchasesItem._id}>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label
                          htmlFor={purchasesItem._id}
                          className='mb-5 last:mb-0 flex'
                        >
                          <div className=' grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 cursor-pointer'>
                            <div className='col-span-6'>
                              <div className='flex'>
                                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                  <input
                                    type='checkbox'
                                    className='h-5 w-5 accent-orange cursor-pointer'
                                    id={purchasesItem._id}
                                    checked={purchasesItem.checked}
                                    onChange={handleChecked(index)}
                                  />
                                </div>

                                <div className='flex-grow'>
                                  <div className='flex'>
                                    <Link
                                      className='h-20 w-20 flex-shrink-0'
                                      to={`${path.home}${generateNameId({
                                        name: purchasesItem.product.name,
                                        id: purchasesItem.product._id
                                      })}`}
                                    >
                                      <img
                                        alt={purchasesItem.product.name}
                                        src={purchasesItem.product.image}
                                      />
                                    </Link>

                                    <div className='flex-grow px-2 pt-1 pb-2'>
                                      <Link
                                        to={`${path.home}${generateNameId({
                                          name: purchasesItem.product.name,
                                          id: purchasesItem.product._id
                                        })}`}
                                        className='text-left line-clamp-2'
                                      >
                                        {purchasesItem.product.name}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-span-6'>
                              <div className='grid grid-cols-5 items-center'>
                                <div className='col-span-2'>
                                  <div className='flex items-center justify-center'>
                                    <span className='text-gray-300 line-through'>
                                      ₫
                                      {formatCurrency(
                                        purchasesItem.product
                                          .price_before_discount
                                      )}
                                    </span>
                                    <span className='ml-3'>
                                      ₫
                                      {formatCurrency(
                                        purchasesItem.product.price
                                      )}
                                    </span>
                                  </div>
                                </div>

                                <div className='col-span-1'>
                                  <QuantityController
                                    max={purchasesItem.product.quantity}
                                    value={purchasesItem.buy_count}
                                    classNameWrapper='flex'
                                    onIncrease={(value) =>
                                      handleQuantity(
                                        index,
                                        value,
                                        value <=
                                          purchasesItem.product.quantity &&
                                          value !==
                                            (purchasesData as Purchases[])[
                                              index
                                            ].buy_count
                                      )
                                    }
                                    onDecrease={(value) =>
                                      handleQuantity(
                                        index,
                                        value,
                                        value >= 1 &&
                                          value !==
                                            (purchasesData as Purchases[])[
                                              index
                                            ].buy_count
                                      )
                                    }
                                    disabled={purchasesItem.disabled}
                                    onType={handleTypeQuantity(index)}
                                    onFocusOut={(value) =>
                                      handleQuantity(
                                        index,
                                        value,
                                        value >= 1 &&
                                          value <=
                                            purchasesItem.product.quantity &&
                                          value !==
                                            (purchasesData as Purchases[])[
                                              index
                                            ].buy_count
                                      )
                                    }
                                  />
                                </div>

                                <div className='col-span-1'>
                                  <span className='text-orange'>
                                    ₫
                                    {formatCurrency(
                                      purchasesItem.product.price *
                                        purchasesItem.buy_count
                                    )}
                                  </span>
                                </div>

                                <div className='col-span-1'>
                                  <button
                                    className='bg-none text-black transition-colors hover:text-orange'
                                    onClick={() =>
                                      handleDeleteProductFromCart(index)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange cursor-pointer'
                    checked={isAllChecked}
                    onChange={handleAllChecked}
                  />
                </div>

                <button
                  className='mx-3 border-none bg-none'
                  onClick={handleAllChecked}
                >
                  Chọn tất cả ({extensionPurchases.length})
                </button>
                <button
                  className='mx-3 border-none bg-none'
                  onClick={handleDeleteProductsFromCart}
                >
                  Xóa Tất Cả ({checkedPurchasesCount})
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán :</div>
                    <div className='ml-2 text-2xl text-orange'>
                      ₫{formatCurrency(totalCheckedPurchasesPrice)}
                    </div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>
                      ₫{formatCurrency(totalCheckedPurchasesSavingPrice)}
                    </div>
                  </div>
                </div>

                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  onClick={handleBuyProductsFromCart}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img
              src={noproduct}
              alt='no purchase'
              className='mx-auto h-40 w-40'
            />
            <div className='mt-5 font-bold text-gray-400'>
              Giỏ hàng của bạn còn trống
            </div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

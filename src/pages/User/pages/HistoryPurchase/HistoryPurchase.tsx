/* eslint-disable prettier/prettier */
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/auth'
import { purchasesStatus } from 'src/constants/purchases'
import { useQueryParams } from 'src/hooks'

export default function HistoryPurchase() {
  const queryParams = useQueryParams()
  const status: number = Number(queryParams.status)
  const purchasesTabs = [
    {
      status: purchasesStatus.all,
      name: 'Tất cả'
    },
    {
      status: purchasesStatus.awaitingConfirmation,
      name: 'Chờ Xác Nhận'
    },
    {
      status: purchasesStatus.awaitingGetting,
      name: 'Chờ Lấy Hàng'
    },
    {
      status: purchasesStatus.beingTransported,
      name: 'Đang Vận Chuyển'
    },
    {
      status: purchasesStatus.delivered,
      name: 'Đã Giao'
    },
    {
      status: purchasesStatus.cancelled,
      name: 'Đã Hủy'
    }
  ]

  const PurchasesLinks = purchasesTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center',
        {
          'border-b-orange text-orange': status === tab.status,
          'border-b-black/10 text-gray-900': status !== tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {PurchasesLinks}
          </div>
        </div>
      </div>
    </div>
  )
}

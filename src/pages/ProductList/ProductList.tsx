/* eslint-disable prettier/prettier */
import { keepPreviousData, useQuery } from '@tanstack/react-query'

// Components
import { AsideFilter, ProductItem, SortProductList } from './Components'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import Pagination from 'src/Components/Pagination'
import categoriesApi from 'src/apis/categories.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Helmet } from 'react-helmet-async'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  // get products
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  // get Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoriesApi.getCategories()
    },
    placeholderData: keepPreviousData
  })

  const products = productsData?.data.data.products
  const pageSize: number = productsData?.data.data.pagination
    .page_size as number

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Shopee Clone | Trang Chủ</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3 justify-self-stretch'>
            <AsideFilter
              categories={categoriesData?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>

          <div className='col-span-9'>
            <SortProductList queryConfig={queryConfig} pageSize={pageSize} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {products &&
                products.map((product) => {
                  // console.log(product)
                  return (
                    <div className='col-span-1' key={product._id}>
                      <ProductItem data={product} />
                    </div>
                  )
                })}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={pageSize} />
          </div>
        </div>
      </div>
    </div>
  )
}

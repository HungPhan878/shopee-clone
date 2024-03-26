/* eslint-disable prettier/prettier */
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'

// Components
import { useQueryParams } from 'src/hooks'
import { AsideFilter, ProductItem, SortProductList } from './Components'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import Pagination from 'src/Components/Pagination'
import categoriesApi from 'src/apis/categories.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  // get products
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
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

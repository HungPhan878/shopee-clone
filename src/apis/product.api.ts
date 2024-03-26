// components
import http from 'src/utils/http'
import { ProductListConfig, ProductList, Product } from 'src/types/product.type'
import { SuccessResponsiveApi } from 'src/types/utils.type'

const URL = 'products'

const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<SuccessResponsiveApi<ProductList>>(URL, { params })
  },

  getProductItem(id: string) {
    return http.get<SuccessResponsiveApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi

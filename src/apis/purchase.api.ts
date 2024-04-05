/* eslint-disable prettier/prettier */
import { Purchases, PurchasesListStatus } from 'src/types/purchase.type'
import { SuccessResponsiveApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchasesApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponsiveApi<Purchases>>(
      `${URL}/add-to-cart`,
      body
    )
  },
  getPurchases(params: { status: PurchasesListStatus }) {
    return http.get<SuccessResponsiveApi<Purchases[]>>(`${URL}`, { params })
  },
  updatePurchases(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponsiveApi<Purchases>>(
      `${URL}/update-purchase`,
      body
    )
  },
  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponsiveApi<Purchases[]>>(
      `${URL}/buy-products`,
      body
    )
  },
  deletePurchases(purchasesId: string[]) {
    return http.delete<SuccessResponsiveApi<{ deleted_count: number }>>(URL, {
      data: purchasesId
    })
  }
}

export default purchasesApi

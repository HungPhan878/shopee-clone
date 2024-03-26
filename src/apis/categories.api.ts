import { Category } from 'src/types/category'
import { SuccessResponsiveApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoriesApi = {
  getCategories() {
    return http.get<SuccessResponsiveApi<Category[]>>(URL)
  }
}

export default categoriesApi

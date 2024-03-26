import { useQuery } from '@tanstack/react-query'
import useParams from 'src/hooks/useSearchParams'

// components
import productApi from 'src/apis/product.api'

export default function ProductDetail() {
  const { id } = useParams()
  console.log(id)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductItem(id)
  })
  console.log(data)

  return <div>ProductDetail</div>
}

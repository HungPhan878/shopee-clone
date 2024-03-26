import { useSearchParams } from 'react-router-dom'

export default function useParams() {
  const [useParams] = useSearchParams()
  return Object.fromEntries([...useParams])
}

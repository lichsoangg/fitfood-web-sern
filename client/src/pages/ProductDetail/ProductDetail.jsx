import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/products/productsApi'
import { getIdFromUrl } from '../../utils/utils'
import ProductDetailCard from './components/ProductDetailCard'
import ProductSimilar from './components/ProductSimilar'
import './ProductDetail.scss'
export default function ProductDetail() {
  const { productUrl } = useParams()
  const productID = Number(getIdFromUrl(productUrl))
  const { data: Product, isFetching: isGetProductFetching } = useGetProductQuery(productID)

  return (
    <div className='product-detail'>
      <ProductDetailCard Product={Product} isGetProductFetching={isGetProductFetching} />
      <ProductSimilar ProductTypeID={Product?.ProductTypeID} />
    </div>
  )
}

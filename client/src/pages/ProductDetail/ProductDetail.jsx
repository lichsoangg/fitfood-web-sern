import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { useGetProductQuery } from '../../features/products/productsApi'
import { getIdFromUrl } from '../../utils/utils'
import ProductDetailCard from './components/ProductDetailCard'
import ProductSimilar from './components/ProductSimilar'
import './ProductDetail.scss'

export default function ProductDetail() {
  const { productUrl } = useParams()
  const productID = Number(getIdFromUrl(productUrl))
  const { data: Product, isFetching: isGetProductFetching } = useGetProductQuery(productID)
  if (!Product) return
  return (
    <div className='product-detail'>
      <Helmet>
        {/* HTML Meta Tags */}
        <title>{Product.Name} || Fitfood</title>
        <meta name='description' content='Sản phẩm chất lượng tốt nhất tại Fitfood' />
        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content={`${Product.name} || Fitfood`} />
        <meta itemProp='description' content='Sản phẩm chất lượng tốt nhất tại Fitfood' />
        <meta itemProp='image' content={`${Product.Avatar}`} />
        {/* Facebook Meta Tags */}
        <meta property='og:url' content='https://www.fitfood.kd14.me' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`${Product.name} || Fitfood`} />
        <meta property='og:description' content='Sản phẩm chất lượng tốt nhất tại Fitfood' />
        <meta property='og:image' content={`${Product.Avatar}`} />
        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${Product.name} || Fitfood`} />
        <meta name='twitter:description' content='Sản phẩm chất lượng tốt nhất tại Fitfood' />
        <meta name='twitter:image' content={`${Product.Avatar}`} />
      </Helmet>
      <ProductDetailCard Product={Product} isGetProductFetching={isGetProductFetching} />
      <ProductSimilar ProductTypeID={Product?.ProductTypeID} currentProductID={Product.ProductID} />
    </div>
  )
}

import { v4 as uuidv4 } from 'uuid'
import Loading from '../../../../components/Loading/Loading'
import ProductItem from '../../../../components/ProductItem/ProductItem'
import { useGetProductsQuery } from '../../../../features/products/productsApi'
import './ProductSimilar.scss'
export default function ProductSimilar({ ProductTypeID, currentProductID }) {
  const { data: productsData, isFetching: isProductsFetching } = useGetProductsQuery(
    { product_type: ProductTypeID, limit: 4, page: 1 },
    { skip: !ProductTypeID }
  )
  let products = productsData?.data?.data

  return (
    <div className='product-similar mainWrapper container'>
      {!isProductsFetching ? (
        <>
          <h2 className='product-similar__title'>Các sản phẩm tương tự</h2>
          <div className='product-similar__list'>
            {products?.length > 0
              ? products.map((product) => {
                  return (
                    <ProductItem
                      key={uuidv4()}
                      id={product.ProductID}
                      image={product.Avatar}
                      name={product.Name}
                      price={product.Price}
                      unit={product.Unit}
                      rating={product.Rating}
                      soldQuantity={product.SoldQuantity}
                    />
                  )
                })
              : null}
          </div>
        </>
      ) : (
        <Loading size={4} />
      )}
    </div>
  )
}

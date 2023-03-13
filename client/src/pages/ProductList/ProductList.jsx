import { v4 as uuidv4 } from 'uuid'

import { useGetProductsQuery } from '../../features/products/productsApi'
import useQueryParams from '../../hooks/useQueryParams'

import Pagination from '../../components/Pagination/Pagination'
import ProductItem from '../../components/ProductItem'
import TitleSection from '../../components/TitleSection'

import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { SORT_PRODUCTS } from '../../constants/utils'
import ProductAsideFilter from './components/ProductAsideFilter'
import ProductSortBar from './components/ProductSortBar'
import './ProductList.scss'

const initialQuery = {
  limit: 6,
  page: 1,
  price_min: 50000,
  price_max: 1400000,
  order: SORT_PRODUCTS.DESC,
  orderField: 'SoldQuantity'
}
export default function ProductList() {
  const location = useLocation()
  let queryConfig = useQueryParams()
  if (Object.keys(queryConfig).length === 0) {
    queryConfig = { ...initialQuery }
  }
  const { data: productsData, isFetching: isGetProductLoading } = useGetProductsQuery(queryConfig)

  const products = productsData?.data

  return (
    <div className='menu'>
      <section className='menu-top'>
        <div className='mainWrapper container'>
          <TitleSection
            title='Lựa chọn sản phẩm'
            styleBorder={{ borderColor: '#ffffff' }}
            styleGroup={{ alignItems: 'center', paddingTop: '40px' }}
          ></TitleSection>
        </div>
      </section>
      <section className='products mainWrapper container'>
        <ProductAsideFilter initialQuery={initialQuery} queryConfig={queryConfig} />
        <div className='products__wrapper'>
          {isGetProductLoading ? (
            <Loading size={3} />
          ) : (
            <>
              <ProductSortBar queryConfig={queryConfig} />
              {products?.data.length > 0 ? (
                <div className='products__wrapper--list'>
                  {products?.data?.map((product) => {
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
                  })}
                </div>
              ) : (
                <div className='noProducts'>
                  <p>Không có sản phẩm phù hợp</p>
                </div>
              )}
              {products?.data?.length > 0 ? (
                <Pagination
                  queryConfig={queryConfig}
                  pageSize={products?.pagesize}
                  pathname={location?.pathname}
                  stylePagination={{ margin: '20px 20px 20px auto', width: 'max-content' }}
                ></Pagination>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

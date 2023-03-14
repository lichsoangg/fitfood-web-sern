import { v4 as uuidv4 } from 'uuid'

import { useGetProductsQuery } from '../../features/products/productsApi'
import useQueryParams from '../../hooks/useQueryParams'
import { Helmet } from 'react-helmet-async'
import Pagination from '../../components/Pagination/Pagination'
import ProductItem from '../../components/ProductItem'
import TitleSection from '../../components/TitleSection'

import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { SORT_PRODUCTS } from '../../constants/utils'
import ProductAsideFilter from './components/ProductAsideFilter'
import ProductSortBar from './components/ProductSortBar'
import './ProductList.scss'
import { useModal } from '../../hooks/useModal'
import DropdownBase from '../../components/DropdownBase/DropdownBase'

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
  const { activeModalRef, rect, open, setOpen } = useModal()

  return (
    <div className='menu'>
      <Helmet>
        {/* HTML Meta Tags */}
        <title>Đặt món - Fitfood</title>
        <meta name='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content='Đặt món - Fitfood' />
        <meta itemProp='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta itemProp='image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        {/* Facebook Meta Tags */}
        <meta property='og:url' content='https://www.fitfood.kd14.me' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Đặt món - Fitfood' />
        <meta property='og:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta property='og:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Đặt món - Fitfood' />
        <meta name='twitter:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta name='twitter:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
      </Helmet>
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
        <div className='products__filter-group-responsive' ref={activeModalRef}>
          <span>Lọc sản phẩm</span>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
            />
          </svg>
          <DropdownBase
            rect={rect}
            setOpen={setOpen}
            stylePortal={{
              opacity: `${open ? '1' : '0'}`,
              pointerEvents: `${open ? 'auto' : 'none'}`,
              visibility: `${open ? 'visible' : 'hidden'}`
            }}
            styleContent={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '90%',
              transform: 'translate(-50%,-50%)'
            }}
          >
            <ProductAsideFilter
              className='products__filter-responsive'
              initialQuery={initialQuery}
              queryConfig={queryConfig}
              setOpenFilterAside={setOpen}
            />
          </DropdownBase>
        </div>

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

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useModal } from '../../hooks/useModal'
import useQueryParams from '../../hooks/useQueryParams'
import { useGetProductsQuery } from '../../features/products/productsApi'

import DropdownBase from '../../components/DropdownBase/DropdownBase'
import Pagination from '../../components/Pagination/Pagination'
import ProductItem from '../../components/ProductItem'
import TitleSection from '../../components/TitleSection'

import './ProductList.scss'
import useDebounce from '../../hooks/useDebounce'
import { useEffect } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useGetProductTypesQuery } from '../../features/typeProduct/typeProductApi'
import FilterPriceRange from '../../components/FilterPriceRange'

const initialQuery = {
  limit: 6,
  page: 1,
  price_min: 50000,
  price_max: 1400000
}
export default function ProductList() {
  const navigate = useNavigate()
  const location = useLocation()
  let queryConfig = useQueryParams()
  if (Object.keys(queryConfig).length === 0) {
    queryConfig = { ...initialQuery }
  }
  const { activeModalRef, open, rect, setOpen } = useModal()
  const { data: productsData, isFetching: isGetProductLoading } = useGetProductsQuery(queryConfig)
  const { data: productTypesData, isFetching: isFetChingProductTypes } = useGetProductTypesQuery()
  const products = productsData?.data
  const productTypes = productTypesData?.data
  //debounce search
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 500)
  useEffect(() => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...queryConfig, page: 1, search: debounceSearch }).toString()
    })
  }, [debounceSearch])
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  //filter type product
  const handleFilterType = (productTypeID) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...queryConfig, page: 1, product_type: productTypeID }).toString()
    })
  }
  //filter product type name
  const productTypeName = productTypes?.filter((productType) => {
    return Number(productType.ProductTypeID) === Number(queryConfig.product_type)
  })[0]?.Name

  //filter rating
  const handleFilterRating = (ratingScore) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...queryConfig, page: 1, rating: ratingScore }).toString()
    })
  }

  //reset filter
  const handleClickResetFilter = () => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...initialQuery }).toString()
    })
  }
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
        <div className='products__filter'>
          <h3>Lọc sản phẩm</h3>
          {/* Search Products */}
          <label htmlFor='search'>Tìm kiếm sản phẩm</label>
          <input
            type='text'
            placeholder='Nhập nội dung cần tìm'
            id='search'
            className='products__filter--search'
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          {/* Filter Type */}
          <div className='products__filter--type'>
            <label>Chọn loại sản phẩm</label>
            <div className='label' ref={activeModalRef}>
              <span>{productTypeName ? productTypeName : 'Tất cả'}</span>
            </div>
            {open && (
              <DropdownBase
                rect={rect}
                setOpen={setOpen}
                styleContent={{ position: 'absolute', transform: `translate(${window.scrollX}px,${window.scrollY}px)` }}
              >
                <div className='products__filter--type-dropdown'>
                  <span onClick={() => handleFilterType('')}>Tất cả</span>
                  {productTypes.map((productType) => {
                    if (productType !== queryConfig?.product_type) {
                      return (
                        <span key={uuidv4()} onClick={() => handleFilterType(productType.ProductTypeID)}>
                          {productType.Name}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              </DropdownBase>
            )}
          </div>
          {/* Filter Price */}
          <label>Chọn khoảng giá</label>
          <FilterPriceRange priceMin={0} priceMax={1500000} queryConfig={queryConfig} />
          {/* Filter Rating */}
          <div className='products__filter--rating'>
            <label>Đánh giá sản phẩm</label>
            <div
              onClick={() => handleFilterRating(5)}
              className={`${Number(queryConfig.rating) === 5 ? 'rating-active' : ''}`}
            >
              ⭐⭐⭐⭐⭐
            </div>
            <div
              onClick={() => handleFilterRating(4)}
              className={`${Number(queryConfig.rating) === 4 ? 'rating-active' : ''}`}
            >
              ⭐⭐⭐⭐ trở lên
            </div>
            <div
              onClick={() => handleFilterRating(3)}
              className={`${Number(queryConfig.rating) === 3 ? 'rating-active' : ''}`}
            >
              ⭐⭐⭐ trở lên
            </div>
            <div
              onClick={() => handleFilterRating(2)}
              className={`${Number(queryConfig.rating) === 2 ? 'rating-active' : ''}`}
            >
              ⭐⭐ trở lên
            </div>
            <div
              onClick={() => handleFilterRating(1)}
              className={`${Number(queryConfig.rating) === 1 ? 'rating-active' : ''}`}
            >
              ⭐ trở lên
            </div>
          </div>
          {/* Delete Filter */}
          <div className='products__filter--del' onClick={() => handleClickResetFilter()}>
            Xoá tất cả
          </div>
        </div>
        <div className='products__wrapper'>
          {products?.data.length > 0 ? (
            <div className='products__wrapper--list'>
              {products?.data?.map((product) => {
                return (
                  <ProductItem
                    key={uuidv4()}
                    id={product.ProductID}
                    image={product.Avatar}
                    name={product.ProductName}
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
        </div>
      </section>
    </div>
  )
}

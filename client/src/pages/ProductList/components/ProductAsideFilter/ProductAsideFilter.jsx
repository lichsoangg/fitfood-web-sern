import React, { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useGetProductTypesQuery } from '../../../../features/typeProduct/typeProductApi'
import useDebounce from '../../../../hooks/useDebounce'
import { useModal } from '../../../../hooks/useModal'
import DropdownBase from '../../../../components/DropdownBase/DropdownBase'
import FilterPriceRange from '../../../../components/FilterPriceRange'
import './ProductAsideFilter.scss'
import Loading from '../../../../components/Loading/Loading'
export default function ProductAsideFilter({ setOpenFilterAside, queryConfig, initialQuery, className }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { activeModalRef, open, rect, setOpen } = useModal()
  const { data: productTypesData, isFetching: isFetChingProductTypes } = useGetProductTypesQuery()
  const productTypes = productTypesData?.data

  //debounce search
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 500)
  useEffect(() => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...queryConfig, page: 1, search: debounceSearch }).toString()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (Number(ratingScore) === Number(queryConfig.rating)) {
      navigate({
        pathname: location?.pathname,
        search: createSearchParams({ ...queryConfig, page: 1, rating: 0 }).toString()
      })
    } else {
      navigate({
        pathname: location?.pathname,
        search: createSearchParams({ ...queryConfig, page: 1, rating: ratingScore }).toString()
      })
    }
  }

  //reset filter
  const handleClickResetFilter = () => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...initialQuery }).toString()
    })
  }
  const handleCloseFilterAside = () => {
    setOpenFilterAside && setOpenFilterAside(false)
  }
  return (
    <div className={`products__filter ${className}`}>
      <div className='products__filter--operation'>
        <div className='products__filter--operation--close' onClick={handleCloseFilterAside}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke={'black'}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
      </div>
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
              {isFetChingProductTypes ? <Loading size={2} /> : null}
              {!isFetChingProductTypes ? <span onClick={() => handleFilterType('')}>Tất cả</span> : null}
              {productTypes?.map((productType) => {
                return (
                  <span key={uuidv4()} onClick={() => handleFilterType(productType.ProductTypeID)}>
                    {productType.Name}
                  </span>
                )
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
  )
}

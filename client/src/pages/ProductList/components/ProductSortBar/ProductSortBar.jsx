import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { SORT_PRODUCTS } from '../../../../constants/utils'
import './ProductSortBar.scss'

export default function ProductSortBar({ queryConfig }) {
  const location = useLocation()
  const navigate = useNavigate()

  //sort
  const handleSortProduct = ({ order, orderField }) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ ...queryConfig, page: 1, order, orderField }).toString()
    })
  }
  return (
    <div className='products-sort-bar'>
      <div
        onClick={() => handleSortProduct({ order: SORT_PRODUCTS.DESC, orderField: 'SoldQuantity' })}
        className={`products-sort-bar__item ${
          queryConfig.order === SORT_PRODUCTS.BEST_SOLD || !queryConfig.order ? 'products-sort-bar__item-active' : ''
        }`}
      >
        Bán chạy
      </div>
      <div
        onClick={() => handleSortProduct({ order: SORT_PRODUCTS.ASC, orderField: 'Price' })}
        className={`products-sort-bar__item ${
          queryConfig.order === SORT_PRODUCTS.PRICE_ASC ? 'products-sort-bar__item-active' : ''
        }`}
      >
        Giá: Thấp đến Cao
      </div>
      <div
        onClick={() => handleSortProduct({ order: SORT_PRODUCTS.DESC, orderField: 'Price' })}
        className={`products-sort-bar__item ${
          queryConfig.order === SORT_PRODUCTS.PRICE_DESC ? 'products-sort-bar__item-active' : ''
        }`}
      >
        Giá: Cao đến thấp
      </div>
    </div>
  )
}

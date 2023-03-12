import { useSelector } from 'react-redux'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import { useGetPurchaseQuery } from '../../features/purchase/purchaseApi'
import { formatCurrency, handleCalcSumPrice } from '../../utils/utils'
import { AcceptButton } from '../Buttons/Buttons'

import './Cart.scss'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import CartList from '../CartList'
export default function Cart({ open, setOpen }) {
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  const { data: productsInCartData, isFetching: isProductsInCartFetching } = useGetPurchaseQuery(
    { state: -1 },
    { skip: !isAuthenticated }
  )
  const cartProducts = productsInCartData?.data?.data

  const handleCloseCart = () => {
    setOpen(!open)
  }

  return (
    <div className={`cart ${open ? 'cart-open' : ''} `}>
      <div className='cart__operation'>
        <div className='cart__operation--close' onClick={handleCloseCart}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke={'black'}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
      </div>
      <CartList
        cartProducts={cartProducts}
        isAuthenticated={isAuthenticated}
        isProductsInCartFetching={isProductsInCartFetching}
        setOpen={setOpen}
      />
      {!isAuthenticated || cartProducts?.length < 1 ? null : (
        <div className='cart__price-payment'>
          <div className='price'>
            Tạm tính: <strong>{formatCurrency(handleCalcSumPrice(cartProducts) || '')}đ</strong>
          </div>
          <Link to={path.payment} onClick={() => setOpen(false)}>
            <AcceptButton>Đặt hàng</AcceptButton>
          </Link>
        </div>
      )}
    </div>
  )
}

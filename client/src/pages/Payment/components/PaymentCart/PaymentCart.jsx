import { useSelector } from 'react-redux'
import CartList from '../../../../components/CartList/CartList'
import { selectCurrentAuth } from '../../../../features/authentication/authSlice'
import { useGetPurchaseQuery } from '../../../../features/purchase/purchaseApi'
import { formatCurrency, handleCalcSumPrice } from '../../../../utils/utils'
import './PaymentCart.scss'
export default function PaymentCart({ cartProducts, isAuthenticated, isProductsInCartFetching }) {
  return (
    <div className='payment-cart'>
      <h3>Kiểm tra giỏ hàng</h3>
      <CartList
        cartProducts={cartProducts}
        isProductsInCartFetching={isProductsInCartFetching}
        isAuthenticated={isAuthenticated}
      />
      <div className='payment-cart__price'>
        Tổng tiền: <strong> {formatCurrency(handleCalcSumPrice(cartProducts))}đ</strong>
      </div>
    </div>
  )
}

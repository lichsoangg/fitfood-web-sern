import { useSelector } from 'react-redux'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import { useGetPurchaseQuery } from '../../features/purchase/purchaseApi'
import { formatCurrency } from '../../utils/utils'
import { AcceptButton } from '../Buttons/Buttons'
import CartItem from '../CartItem'
import Loading from '../Loading/Loading'
import NoData from '../NoData/NoData'
import ProductNotFoundImage from '../../assets/svg/product_not_found.svg'

import './Cart.scss'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
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
      <div className='cart__list'>
        {isProductsInCartFetching ? (
          <Loading size={3} />
        ) : cartProducts ? (
          cartProducts.map((product) => {
            return <CartItem product={product}></CartItem>
          })
        ) : isAuthenticated ? (
          <NoData
            message={'Không có sản phẩm trong giỏ hàng'}
            image={ProductNotFoundImage}
            imageStyles={{ width: '100px' }}
          />
        ) : (
          <NoData image={ProductNotFoundImage} imageStyles={{ width: '100px' }}>
            Vui lòng{' '}
            <Link to={path.login} style={{ color: '#ff2033' }} onClick={() => setOpen(false)}>
              đăng nhập
            </Link>{' '}
            để xem giỏ hàng
          </NoData>
        )}
      </div>
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
function handleCalcSumPrice(products) {
  const sum = products?.reduce((sumPrice, product) => {
    return Number(sumPrice) + Number(product.Price * product.Quantity)
  }, 0)
  return sum
}

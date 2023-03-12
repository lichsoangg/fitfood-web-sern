import CartItem from '../CartItem'
import Loading from '../Loading/Loading'
import NoData from '../NoData/NoData'
import ProductNotFoundImage from '../../assets/svg/product_not_found.svg'
import { Link } from 'react-router-dom'
import path from '../../constants/path'

export default function CartList({ cartProducts, isProductsInCartFetching, isAuthenticated, setOpen, style }) {
  return (
    <div className='cart__list' style={{ ...style }}>
      {isProductsInCartFetching ? (
        <Loading size={3} />
      ) : cartProducts?.length > 0 ? (
        cartProducts.map((product) => {
          return <CartItem product={product}></CartItem>
        })
      ) : isAuthenticated ? (
        <NoData image={ProductNotFoundImage} imageStyles={{ width: '100px' }} style={{ textAlign: 'center' }}>
          Không có sản phẩm trong giỏ hàng. <br style={{ marginTop: '20px' }} />
          Đến trang{' '}
          <Link
            to={path.menu}
            style={{ color: '#ff2033' }}
            onClick={() => {
              setOpen && setOpen(false)
            }}
          >
            đặt hàng
          </Link>{' '}
          để lựa chọn sản phẩm
        </NoData>
      ) : (
        <NoData image={ProductNotFoundImage} imageStyles={{ width: '100px' }}>
          Vui lòng{' '}
          <Link
            to={path.login}
            style={{ color: '#ff2033' }}
            onClick={() => {
              setOpen && setOpen(false)
            }}
          >
            đăng nhập
          </Link>{' '}
          để xem giỏ hàng
        </NoData>
      )}
    </div>
  )
}

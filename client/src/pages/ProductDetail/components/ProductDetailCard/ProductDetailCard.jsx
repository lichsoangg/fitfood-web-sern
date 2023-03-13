import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductNotFoundImage from '../../../../assets/svg/product_not_found.svg'
import { AcceptButton } from '../../../../components/Buttons/Buttons'
import Error from '../../../../components/Error/Error'
import Loading from '../../../../components/Loading/Loading'
import NoData from '../../../../components/NoData/NoData'
import { ErrorNotify, SuccessNotify } from '../../../../components/Notify/Notify'
import ProductRating from '../../../../components/ProductRating/ProductRating'
import QuantityController from '../../../../components/QuantityController/QuantityController'
import { selectCurrentAuth } from '../../../../features/authentication/authSlice'
import { useAddToCartMutation } from '../../../../features/purchase/purchaseApi'
import { formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import './ProductDetailCard.scss'
export default function ProductDetailCard({ Product, isGetProductFetching }) {
  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation()
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)

  const onChangeFunc = (value) => {
    setQuantity(value)
  }
  const handleClickAddToCart = async () => {
    if (isAuthenticated) {
      const data = { Quantity: quantity, ProductID: Product.ProductID }
      try {
        const response = await addToCart(data).unwrap()
        if (Number(response.status) === 201) {
          SuccessNotify(response.message)
        }
      } catch (error) {
        ErrorNotify(error.data.message)
      }
    } else {
      setError('Vui lòng đăng nhập để thực hiện tính năng')
    }
  }
  return (
    <div className='product-detail__card'>
      {Product ? (
        <>
          <div className='product-detail__card--left'>
            <div className='image'>
              <img src={Product.Avatar} alt={Product.Name} />
            </div>
          </div>
          <div className='product-detail__card--right'>
            <div className='name'>{Product.Name}</div>
            <div className='review'>
              {Product.Rating ? (
                <div className='rating'>
                  <span>{Product.Rating}</span>
                  <ProductRating rating={Product.Rating} />
                </div>
              ) : null}
              {Product.Rating ? <span className='line'>|</span> : null}
              <span className='sold'>{formatNumberToSocialStyle(Product.SoldQuantity)} đã bán</span>
            </div>
            <div className='price'>
              <strong>{formatCurrency(Product.Price)}đ</strong> /{Product.Unit}
            </div>
            <QuantityController maxValue={Number(Product.Quantity)} onChangeFunc={onChangeFunc} value={quantity} />
            <div className='quantity'>
              Hiện đang còn <strong> {Product.Quantity}</strong> sản phẩm
            </div>
            <AcceptButton
              onClick={handleClickAddToCart}
              styleButton={{ marginTop: 'auto', width: 'max-content', minWidth: '200px' }}
              isLoading={isAddToCartLoading}
            >
              Thêm vào giỏ hàng
            </AcceptButton>
            <Error>{error}</Error>
          </div>
        </>
      ) : !isGetProductFetching ? (
        <NoData message={'Sản phẩm không tồn tại'} image={ProductNotFoundImage} imageStyles={{ width: '100px' }} />
      ) : (
        <Loading size={3} />
      )}
    </div>
  )
}

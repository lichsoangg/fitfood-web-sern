import { useState } from 'react'
import { useDeleteCartMutation, useUpdateCartMutation } from '../../features/purchase/purchaseApi'
import { useDisableClick } from '../../hooks/useDisableClick'
import { formatCurrency } from '../../utils/utils'
import Loading from '../Loading/Loading'
import { ErrorNotify, SuccessNotify } from '../Notify/Notify'
import QuantityController from '../QuantityController/QuantityController'
import './CartItem.scss'
export default function CartItem({ product, style, noPrice = false, noDelete = false, noQuantityController = false }) {
  const [quantity, setQuantity] = useState(product?.Quantity)
  const [updateCart, { isLoading: isUpdateCartLoading }] = useUpdateCartMutation()
  const [deleteCart, { isLoading: isDeleteCartLoading }] = useDeleteCartMutation()

  const onChangeFunc = async (value) => {
    try {
      const response = await updateCart({ ProductID: product.ProductID, Quantity: value }).unwrap()

      if (Number(response.status) === 200) {
        SuccessNotify(response.message)
      }
    } catch (error) {
      ErrorNotify(error.data.message)
    }
  }
  const onChangeFuncLocalState = (value) => {
    setQuantity(value)
  }

  const handleDeleteCart = async () => {
    try {
      const response = await deleteCart([product.ProductID]).unwrap()
      if (Number(response.status) === 200) {
        SuccessNotify(response.message)
      }
    } catch (error) {
      ErrorNotify(error.data.message)
    }
  }
  useDisableClick(isUpdateCartLoading)

  return (
    <div className='cart-item' style={{ ...style }}>
      {isUpdateCartLoading || isDeleteCartLoading ? (
        <Loading size={3} />
      ) : (
        <>
          {' '}
          <div className='cart-item__image'>
            <img src={product?.Avatar} alt={product.Name} />
          </div>
          <div className='cart-item__name-quantity'>
            <h4> {product?.Name}</h4>
            {!noQuantityController ? (
              <QuantityController
                maxValue={product?.MaxQuantity}
                value={quantity}
                stylesInput={{ width: '50px' }}
                onChangeFunc={onChangeFuncLocalState}
                onDecreaseFunc={onChangeFunc}
                onIncreaseFunc={onChangeFunc}
                onBlur={onChangeFunc}
              />
            ) : null}
          </div>
          {noQuantityController ? (
            <div className='cart-item__quantity'>
              {product?.Quantity}/{product?.Unit}
            </div>
          ) : null}
          {!noPrice ? (
            <div className='cart-item__price'>{formatCurrency(product?.Price * product?.Quantity)}đ</div>
          ) : null}
          {!noDelete ? (
            <div className='cart-item__delete' onClick={handleDeleteCart}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

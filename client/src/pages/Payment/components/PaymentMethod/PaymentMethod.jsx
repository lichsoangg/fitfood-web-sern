import './PaymentMethod.scss'
import creditCartImage from '../../../../assets/images/credit-card.png'
import cashImage from '../../../../assets/images/money.png'
import paypalImage from '../../../../assets/images/paypal.png'

import { useState } from 'react'
export default function PaymentMethod() {
  const [option, setOption] = useState(1)

  const handleClickOption = (value) => {
    setOption(value)
  }
  return (
    <div className='payment-method'>
      <h3> Phương thức thanh toán</h3>
      <div
        className={`payment-method__item ${option === 1 ? 'payment-method__item-active' : ''}`}
        onClick={() => handleClickOption(1)}
      >
        <div className='payment-method__item--checkbox'></div>
        <div className='payment-method__item--info'>
          <h4>Tiền mặt</h4>
          <span>Thanh toán khi nhận hàng</span>
        </div>
        <div className='payment-method__item--image'>
          <img src={cashImage} alt='Tiền mặt' />
        </div>
      </div>
      <div
        className={`payment-method__item ${option === 2 ? 'payment-method__item-active' : ''}`}
        onClick={() => handleClickOption(2)}
      >
        <div className='payment-method__item--checkbox'></div>
        <div className='payment-method__item--info'>
          <h4>Paypal</h4>
          <span>Thanh toán dễ dàng, nhanh chóng và tiện lợi</span>
        </div>
        <div className='payment-method__item--image'>
          <img src={paypalImage} alt='Paypal' />
        </div>
      </div>
      <div
        className={`payment-method__item ${option === 3 ? 'payment-method__item-active' : ''}`}
        onClick={() => handleClickOption(3)}
      >
        <div className='payment-method__item--checkbox'></div>
        <div className='payment-method__item--info'>
          <h4>Credit Card</h4>
          <span>Thanh toán với Visa, Mastercard, thẻ tín dụng hoặc thẻ ghi nợ</span>
        </div>
        <div className='payment-method__item--image'>
          <img src={creditCartImage} alt='Credit card' />
        </div>
      </div>
    </div>
  )
}

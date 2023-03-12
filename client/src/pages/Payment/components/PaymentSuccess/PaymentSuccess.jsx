import './PaymentSuccess.scss'
import paymentSuccessImage from '../../../../assets/images/payment_success.png'
import { ThreeDimensionButton } from '../../../../components/Buttons/Buttons'
import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
export default function PaymentSuccess() {
  return (
    <div className='payment-success'>
      <div className='payment-success__image'>
        <img src={paymentSuccessImage} alt='Thanh toán thành công' />
      </div>
      <p>Thanh toán thành công</p>
      <Link to={path.menu}>
        <ThreeDimensionButton>Tiếp tục mua sắm</ThreeDimensionButton>
      </Link>
    </div>
  )
}

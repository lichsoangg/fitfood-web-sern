import CartItem from '../../../../components/CartItem'
import { formatCurrency } from '../../../../utils/utils'
import './PaymentHistoryItem.scss'

export default function PaymentHistoryItem({ bill }) {
  if (!bill) return
  const products = bill.Products.map((product) => {
    return { ...product, Price: product.SalePrice }
  })
  let colorStateBill = bill.State === 1 ? 'orange' : 'green'
  let textStateBill = bill.State === 1 ? 'Đang chuẩn bị hàng' : 'Đã giao hàng'

  return (
    <div className='payment-history-item'>
      <div className='payment-history-item__info'>
        <div className='payment-history-item__info--top'>
          <div className='left'>
            <div className='name'>Người nhận: {bill.CustomerName}</div>
            <div className='phone'>Số điện thoại:{bill.PhoneNumber}</div>
          </div>
          <div className='right'>
            <div className='circle' style={{ background: `${colorStateBill}` }}></div>
            <span style={{ color: `${colorStateBill}` }}>{textStateBill}</span>
          </div>
        </div>
        <div className='payment-history-item__info--bottom'>
          <span>{bill.Address}</span>
          <div className='date'>Ngày đặt hàng: {bill.Date}</div>
        </div>
      </div>
      <div className='payment-history-item__price'>
        Tổng tiền: <strong>{formatCurrency(bill.Price)}đ</strong>
      </div>
      <div className='payment-history-item__products'>
        {products.map((product) => {
          return (
            <CartItem
              noPrice
              noDelete
              noQuantityController
              product={product}
              style={{ height: '100px', justifyContent: 'space-between' }}
            ></CartItem>
          )
        })}
      </div>
    </div>
  )
}

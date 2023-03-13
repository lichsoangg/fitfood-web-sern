import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import { useGetBillQuery } from '../../features/purchase/purchaseApi'
import PaymentHistoryItem from './components/PaymentHistoryItem'
import './PaymentHistory.scss'
export default function PaymentHistory() {
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  const { data: billsData, isFetching: isBillsFetchingData } = useGetBillQuery(
    { state: '' },
    { skip: !isAuthenticated }
  )
  const bills = billsData?.data?.data
  return (
    <div className='payment-history'>
      <h3>Lịch sử giao dịch</h3>
      <div className='payment-history__list'>
        {isBillsFetchingData ? <Loading full size={4}></Loading> : null}
        {bills?.map((bill) => {
          return <PaymentHistoryItem bill={bill} />
        })}
      </div>
    </div>
  )
}

import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Form from '../../../../components/Form/Form'
import { useGetMeQuery } from '../../../../features/account/accountApi'
import { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from '../../../../features/api/apiProvince'
import './PaymentInfo.scss'
export default function PaymentInfo() {
  const { watch, reset, getValues } = useFormContext()
  const { data: provinces, isFetching: provincesLoading } = useGetProvincesQuery()
  const { data: districts, isFetching: districtsLoading } = useGetDistrictsQuery(watch('Province'), {
    skip: !watch('Province')
  })
  const { data: wards, isFetching: wardsLoading } = useGetWardsQuery(watch('District'), {
    skip: !watch('District')
  })
  const { data } = useGetMeQuery()
  const user = data?.data

  //reset form
  const resetForm = useCallback(() => {
    const value = getValues()
    if (value.Name && value.PhoneNumber && value.Address && value.District && value.Province) {
      reset(value)
    } else {
      reset(user)
    }
  }, [])

  useEffect(() => {
    resetForm()
  }, [resetForm])
  return (
    <div className='payment-info'>
      <h3>Kiểm tra giỏ hàng</h3>
      <div className='payment-info__form'>
        <Form.Input placeHolder='Họ tên người nhận hàng' name='Name' />
        <Form.Input placeHolder='Số điện thoại người nhận hàng' name='PhoneNumber' />
        <Form.Dropdown placeHolder='Tỉnh' name='Province' data={provinces} isLoading={provincesLoading} />
        <Form.Dropdown
          placeHolder='Huyện'
          name='District'
          trigger='Province'
          data={districts}
          isLoading={districtsLoading}
        />
        <Form.Dropdown placeHolder='Xã' name='Ward' trigger='Ward' data={wards} isLoading={wardsLoading} />
        <Form.Input placeHolder='Địa chỉ' name='Address' />
      </div>
    </div>
  )
}

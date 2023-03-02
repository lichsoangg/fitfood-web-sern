import React from 'react'
import { useFormContext } from 'react-hook-form'
import Form from '../../../components/Form/Form'
import { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from '../../../features/api/apiProvince.jsx'
export default function AddressForm() {
  const { watch } = useFormContext()
  const { data: provinces, isFetching: provincesLoading } = useGetProvincesQuery()
  const { data: districts, isFetching: districtsLoading } = useGetDistrictsQuery(watch('Province'), {
    skip: !watch('Province')
  })
  const { data: wards, isFetching: wardsLoading } = useGetWardsQuery(watch('District'), {
    skip: !watch('District')
  })

  return (
    <>
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
    </>
  )
}

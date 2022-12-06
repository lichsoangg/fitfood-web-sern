import React from 'react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { InputButton } from '../../components/Buttons/Buttons'
import Form from '../../components/Form/Form'
import image from '../../assets/svg/image.svg'
import roles from '../../constants/roles'
import gender from '../../constants/gender'
import { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from '../api/apiProvince'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  Username: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  Name: yup.string().required('Họ tên là bắt buộc'),
  Role: yup.string().required('Chức vụ là bắt buộc'),
  DayOfBirth: yup.string().required('Ngày sinh là bắt buộc'),
  PhoneNumber: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không đúng định dạng'),
  Gender: yup.string().required('Giới tính là bắt buộc'),
  Province: yup.string().required('Tỉnh là bắt buộc'),
  District: yup.string().required('Huyện là bắt buộc'),
  Address: yup.string().required('Địa chỉ là bắt buộc')
})
const EmployeeInput = React.forwardRef(({ ...rest }, ref) => {
  const [fileAvatar, setFileAvatar] = useState(null)
  const methods = useForm({ resolver: yupResolver(schema) })
  const { handleSubmit, watch } = methods
  const { data: provinces, isFetching: provincesLoading } = useGetProvincesQuery()
  const { data: districts, isFetching: districtsLoading } = useGetDistrictsQuery(watch('Province'), {
    skip: !watch('Province')
  })
  const { data: wards, isFetching: wardsLoading } = useGetWardsQuery(watch('District'), {
    skip: !watch('District')
  })
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className='employeeInput' {...rest} ref={ref}>
      <FormProvider {...methods}>
        <form className='employeeInput__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='employeeInput__form--top employeeInput__form--top-left'>
            <div className='avatar'>
              {fileAvatar && <img src={URL.createObjectURL(fileAvatar)} alt='' />}
              {!fileAvatar && <img src={image} alt='' style={{ border: '1px dashed #111112' }} />}
            </div>
            <div className='button'>
              <InputButton onChange={(e) => setFileAvatar(e.target.files[0])}>Thêm ảnh đại diện</InputButton>
            </div>
          </div>
          <div className='employeeInput__form--top employeeInput__form--top-right'>
            <Form.Input name='Username' placeHolder='Tài khoản' />
            <Form.Input name='Name' placeHolder='Họ tên' />
            <Form.Dropdown name='Role' placeHolder='Chức vụ' data={roles} />
          </div>
          <Form.Dropdown
            name='Province'
            placeHolder='Tỉnh'
            styleFormInput={{ width: 'calc(50% - 16px)' }}
            data={provinces}
            isLoading={provincesLoading}
          />
          <Form.Input name='PhoneNumber' placeHolder='Số điện thoại' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Dropdown
            name='District'
            placeHolder='Huyện'
            styleFormInput={{ width: 'calc(50% - 16px)' }}
            trigger='Province'
            data={districts}
            isLoading={districtsLoading}
          />
          <Form.Input
            name='Gender'
            placeHolder='Giới tính'
            styleFormInput={{ width: 'calc(50% - 16px)' }}
            data={gender}
          />
          <Form.Dropdown
            name='Ward'
            placeHolder='Xã'
            styleFormInput={{ width: 'calc(50% - 16px)' }}
            trigger='Ward'
            data={wards}
            isLoading={wardsLoading}
          />
          <Form.Input name='DayOfBirth' placeHolder='Ngày sinh' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='Address' placeHolder='Địa chỉ chi tiết' />
          <Form.SubmitButton text='Thêm nhân viên' />
        </form>
      </FormProvider>
    </div>
  )
})

export default EmployeeInput

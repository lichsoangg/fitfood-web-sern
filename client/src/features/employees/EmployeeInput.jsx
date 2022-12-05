import React from 'react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { InputButton } from '../../components/Buttons/Buttons'
import Form from '../../components/Form/Form'
import image from '../../assets/svg/image.svg'
import roles from '../../constants/roles'
const EmployeeInput = React.forwardRef(({ ...rest }, ref) => {
  const [fileAvatar, setFileAvatar] = useState(null)
  const methods = useForm()
  const { handleSubmit } = methods
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
          <Form.Input name='Province' placeHolder='Tỉnh' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='PhoneNumber' placeHolder='Số điện thoại' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='District' placeHolder='Huyện' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='Gender' placeHolder='Giới tính' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='Ward' placeHolder='Xã' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='DayOfBirth' placeHolder='Ngày sinh' styleFormInput={{ width: 'calc(50% - 16px)' }} />
          <Form.Input name='Adress' placeHolder='Địa chỉ chi tiết' />
          <Form.SubmitButton text='Thêm nhân viên' />
        </form>
      </FormProvider>
    </div>
  )
})

export default EmployeeInput

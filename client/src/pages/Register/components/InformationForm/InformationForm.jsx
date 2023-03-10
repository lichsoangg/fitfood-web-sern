import React from 'react'
import Form from '../../../../components/Form/Form'
import phoneNumberIcon from '../../../../assets/icons/phonenumber.png'
import nameIcon from '../../../../assets/icons/name.png'
import genderIcon from '../../../../assets/icons/gender.png'
import gender from '../../../../constants/gender'

export default function InformationForm() {
  return (
    <>
      <Form.Input placeHolder='Họ tên' icon={nameIcon} name='Name' />
      <Form.InputDate placeHolder='Ngày sinh' name='DayOfBirth' />
      <Form.Input placeHolder='Số điện thoại' icon={phoneNumberIcon} name='PhoneNumber' />
      <Form.Dropdown placeHolder='Giới tính' icon={genderIcon} name='Gender' data={gender} />
    </>
  )
}

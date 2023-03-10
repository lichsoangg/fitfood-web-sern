import React from 'react'
import UsernameIcon from '../../../../assets/icons/username.png'
import Form from '../../../../components/Form/Form'

export default function AccountForm() {
  return (
    <>
      <Form.Input placeHolder='Email*' icon={UsernameIcon} name='Username' />
      <Form.Input placeHolder='Mật khẩu*' name='Password' type='password' />
      <Form.Input placeHolder='Xác nhận mật khẩu*' name='ConfirmPassword' type='password' />
    </>
  )
}

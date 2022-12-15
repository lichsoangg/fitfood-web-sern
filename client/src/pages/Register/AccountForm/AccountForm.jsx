import React from 'react'
import UsernameIcon from '../../../assets/icons/username.png'
import Form from '../../../components/Form/Form'

export default function AccountForm() {
  return (
    <>
      <Form.Input placeHolder='Email*' icon={UsernameIcon} name='username' />
      <Form.Input placeHolder='Mật khẩu*' name='password' type='password' />
      <Form.Input placeHolder='Xác nhận mật khẩu*' name='confirmPassword' type='password' />
    </>
  )
}

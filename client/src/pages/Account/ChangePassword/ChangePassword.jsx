import React from 'react'
import { Helmet } from 'react-helmet-async'
import './ChangePassword.scss'
import AccountChangePassword from './components/AccountChangePassword'
export default function ChangePassword() {
  return (
    <div className='changePassword'>
      <Helmet>
        <title>Đổi mật khấu | Fitfood</title>
      </Helmet>
      <h3>Đổi mật khẩu</h3>
      <span className='body3'>Nhập mật khẩu hiện tại của bạn để đổi mật khẩu</span>
      <AccountChangePassword />
    </div>
  )
}

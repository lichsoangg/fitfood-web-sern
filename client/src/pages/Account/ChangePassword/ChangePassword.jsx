import React from 'react';
import AccountChangePassword from '../../../features/account/AccountChangePassword';
import './ChangePassword.scss';
export default function ChangePassword() {
  return (
    <div className='changePassword'>
      <h3>Đổi mật khẩu</h3>
      <span className='body3'>Nhập mật khẩu hiện tại của bạn để đổi mật khẩu</span>
      <AccountChangePassword />
    </div>
  );
}

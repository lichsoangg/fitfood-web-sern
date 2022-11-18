import React from 'react';
import AccountUpdate from '../../../features/account/AccountUpdate';
import './AccountInformation.scss';
export default function AccountInformation() {
  return (
    <div className='accountInformation'>
      <h3>Thông tin cá nhân</h3>
      <hr />
      <AccountUpdate />
    </div>
  );
}

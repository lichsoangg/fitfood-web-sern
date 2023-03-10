import React from 'react'
import './AccountInformation.scss'
import AccountUpdate from './components/AccountUpdate'
export default function AccountInformation() {
  return (
    <div className='accountInformation'>
      <h3>Thông tin cá nhân</h3>
      <hr />
      <AccountUpdate />
    </div>
  )
}

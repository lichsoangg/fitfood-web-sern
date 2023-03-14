import React from 'react'
import { Helmet } from 'react-helmet-async'
import './AccountInformation.scss'
import AccountUpdate from './components/AccountUpdate'
export default function AccountInformation() {
  return (
    <div className='accountInformation'>
      <Helmet>
        <title>Thông tin cá nhân | Fitfood</title>
      </Helmet>
      <h3>Thông tin cá nhân</h3>
      <hr />
      <AccountUpdate />
    </div>
  )
}

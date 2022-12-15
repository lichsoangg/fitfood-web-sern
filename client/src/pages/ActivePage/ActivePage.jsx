import React from 'react'
import { useSelector } from 'react-redux'
import NewEmail from '../../assets/images/email.png'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import AuthVerifyEmail from '../../features/authentication/AuthVerifyEmail'
import './ActivePage.scss'

export default function ActivePage({ children }) {
  const { username } = useSelector(selectCurrentAuth)
  const renderActivePage = (
    <div className="activePageWrapper">
      <div className='activePage'>
        <div className='activePage__image'>
          <img src={NewEmail} alt='Verification Email Fitfood' />
        </div>
        <h2 className='activePage__title'>Xác thực Email</h2>
        <span className='activePage__description description-left'>
          Chúng tôi đã gửi mã xác thực đến email: <br />
          <strong>{username}@gmail.com</strong>
        </span>
        <span className='activePage__description description-left'>Vui lòng nhập mã xác thực: </span>
        <AuthVerifyEmail />
      </div>
    </div>
  )
  return renderActivePage
}

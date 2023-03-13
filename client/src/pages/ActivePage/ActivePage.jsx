import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import NewEmail from '../../assets/images/email.png'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import './ActivePage.scss'
import AuthVerifyEmail from './components/AuthVerifyEmail'

export default function ActivePage({ children }) {
  const { username } = useSelector(selectCurrentAuth)
  const renderActivePage = (
    <div className='activePageWrapper'>
      <Helmet>
        <title>Kích hoạt tài khoản | Fitfood</title>
      </Helmet>
      <div className='activePage'>
        <div className='activePage__image'>
          <img src={NewEmail} alt='Verification Email Fitfood' />
        </div>
        <h2 className='activePage__title'>Xác thực Email</h2>
        <span className='activePage__description description-left'>
          Chúng tôi đã gửi mã xác thực đến email: <br />
          <strong>{username}</strong>
        </span>
        <span className='activePage__description description-left'>Vui lòng nhập mã xác thực: </span>
        <AuthVerifyEmail />
      </div>
    </div>
  )
  return renderActivePage
}

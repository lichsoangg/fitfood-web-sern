import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Link, useLocation } from 'react-router-dom'
import appleIcon from '../../assets/icons/appleid.png'
import facebookIcon from '../../assets/icons/facebook.png'
import googleIcon from '../../assets/icons/google.png'
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent'
import path from '../../constants/path'
import AuthLogin from './components/AuthLogin'
import './Login.scss'

export default function Login() {
  const location = useLocation()
  return (
    <ErrorBoundaryComponent>
      <div className='login'>
        <Helmet>
          {/* HTML Meta Tags */}
          <title>Đăng nhập - Fitfood</title>
          <meta name='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          {/* Google / Search Engine Tags */}
          <meta itemProp='name' content='Đăng nhập - Fitfood' />
          <meta itemProp='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta itemProp='image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
          {/* Facebook Meta Tags */}
          <meta property='og:url' content='https://www.fitfood.kd14.me' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Đăng nhập - Fitfood' />
          <meta property='og:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta property='og:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
          {/* Twitter Meta Tags */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Đăng nhập - Fitfood' />
          <meta name='twitter:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta name='twitter:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        </Helmet>
        <h3 className='login__header'>Đăng nhập vào Fitfood</h3>
        <div className='login__description body4'>
          Bạn không có tài khoản?{' '}
          <Link to={path.register} state={location.state}>
            Đăng ký tại đây
          </Link>
        </div>
        <AuthLogin />
        <div className='login__continue-title'>
          <hr />
          <span>hoặc đăng nhập với</span>
          <hr />
        </div>
        <div className='login__difference-login'>
          <div className='login__difference-login__method'>
            <img src={googleIcon} alt='Login Fitfood with Google' />
          </div>
          <div className='login__difference-login__method'>
            <img src={appleIcon} alt='Login Fitfood with AppleID' />
          </div>
          <div className='login__difference-login__method'>
            <img src={facebookIcon} alt='Login Fitfood with Facebook' />
          </div>
        </div>
      </div>
    </ErrorBoundaryComponent>
  )
}

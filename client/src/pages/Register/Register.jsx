import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Link, useLocation } from 'react-router-dom'
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent'
import path from '../../constants/path'
import AuthRegister from './components/AuthRegister'
import './Register.scss'

export default function Register() {
  const location = useLocation()
  return (
    <ErrorBoundaryComponent>
      <div className='register'>
        <Helmet>
          {/* HTML Meta Tags */}
          <title>Đăng ký - Fitfood</title>
          <meta name='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          {/* Google / Search Engine Tags */}
          <meta itemProp='name' content='Đăng ký - Fitfood' />
          <meta itemProp='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta itemProp='image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
          {/* Facebook Meta Tags */}
          <meta property='og:url' content='https://www.fitfood.kd14.me' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Đăng ký - Fitfood' />
          <meta property='og:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta property='og:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
          {/* Twitter Meta Tags */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Đăng ký - Fitfood' />
          <meta name='twitter:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
          <meta name='twitter:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        </Helmet>
        <h3 className='register__header'>Tạo tài khoản Fitfood</h3>
        <div className='register__description body4'>
          Bạn đã có tài khoản?{' '}
          <Link to={path.login} state={location.state}>
            Đăng nhập tại đây
          </Link>
        </div>
        <AuthRegister />
      </div>
    </ErrorBoundaryComponent>
  )
}

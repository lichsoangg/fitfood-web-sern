import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ACTIVE } from '../../constants/utils'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import ActivePage from '../../pages/ActivePage/ActivePage'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import './MainLayout.scss'
export default function MainLayout() {
  const { accessToken: token, isActive } = useSelector(selectCurrentAuth)
  const isNoActiveAccount = token && Number(isActive) === Number(ACTIVE.NO)
  return (
    <div className='mainLayout '>
      <Header />
      <div className='mainLayout__outlet'>{isNoActiveAccount ? <ActivePage /> : <Outlet />}</div>
      <Footer />
    </div>
  )
}

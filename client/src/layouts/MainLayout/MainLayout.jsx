import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './MainLayout.scss';
export default function MainLayout() {
  return (
    <div className='mainLayout '>
      <Header />
      <div className='mainLayout__outlet mainWrapper'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

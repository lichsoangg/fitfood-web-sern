import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentAuth } from '../../features/authentication/authSlice';
import NewEmail from '../../assets/images/email.png';
import "./ActivePage.scss";
import AuthVerifyEmail from '../../features/authentication/AuthVerifyEmail';
import { useGetMeQuery } from '../../features/account/accountApi';

export default function ActivePage({ children }) {
  const { username } = useSelector(selectCurrentAuth);
  const { data: user } = useGetMeQuery(undefined, { skip: !username });
  const renderActivePage = <div className='activePage'>
    <div className="activePage__image">
      <img src={NewEmail} alt="Verification Email Fitfood" />
    </div>
    <h2 className="activePage__title">
      Xác thực Email
    </h2>
    <span className='activePage__description description-left'>
      Chúng tôi đã gửi mã xác thực đến email: <br />
      <strong>{username}@gmail.com</strong></span>

    <span className='activePage__description description-left'>
      Vui lòng nhập mã xác thực: </span>
    <AuthVerifyEmail />
  </div>;
  // let activePageRouterRender = username ? (user?.IsActive ? children : renderActivePage) : <Navigate to='/'></Navigate>;
  return renderActivePage;
}

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ForgotPasswordImage from '../../assets/images/forgot_password.png';
import path from '../../constants/path';
import AuthPasswordEmail from '../../features/authentication/AuthPasswordEmail';
import { selectCurrentToken } from '../../features/authentication/authSlice';
import "./ForgotPassword.scss";

export default function ForgotPassword() {
  const location=useLocation();
  const navigate=useNavigate();
  const token=useSelector(selectCurrentToken);

  useEffect(() => {
    if (token) {
      navigate(path.home);
    }
  }, [token, navigate, location]);
  return (
    <div className='forgotPassword'>
        <div className='forgotPassword__image'>
          <img src={ForgotPasswordImage} alt="" />
        </div>
        <h2 className='forgotPassword__title'>Khôi phục mật khẩu</h2>
        <span className='forgotPassword__description'>
        Nhập Email để khôi phục mật khẩu 
      </span>
      <AuthPasswordEmail/>
    </div>
  )
}

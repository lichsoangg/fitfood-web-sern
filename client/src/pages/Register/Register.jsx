import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent';
import AuthRegister from '../../features/authentication/AuthRegister';
import "./Register.scss";


export default function Register() {
    const location=useLocation();
    return (
        <ErrorBoundaryComponent>
            <div className='register' >
                <h3 className="register__header">Tạo tài khoản Fitfood</h3>
                <div className="register__description body4">Bạn đã có tài khoản? <Link to='/dang-nhap' state={location.state}>Đăng nhập tại đây</Link></div>
                <AuthRegister/>
            </div>
        </ErrorBoundaryComponent>
    );
}

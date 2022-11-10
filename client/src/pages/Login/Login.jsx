import React from 'react';
import { Link } from "react-router-dom";
import appleIcon from "../../assets/icons/appleid.png";
import facebookIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google.png";
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent';
import AuthLogin from '../../features/authentication/AuthLogin';
import "./Login.scss";



export default function Login() {
    
    return (
        <ErrorBoundaryComponent>
            <div className='login'>
                <h3 className="login__header">Đăng nhập vào Fitfood</h3>
                <div className="login__description body4">Bạn không có tài khoản? <Link to='/dang-ky'>Đăng ký tại đây</Link></div>
                <AuthLogin/>
                <div className="login__continue-title">
                    <hr />
                    <span>hoặc đăng nhập với</span>
                    <hr />
                </div>
                <div className="login__difference-login">
                    <div className="login__difference-login__method">
                        <img src={googleIcon} alt="Login Fitfood with Google" />
                    </div>
                    <div className="login__difference-login__method">
                        <img src={appleIcon} alt="Login Fitfood with AppleID" />
                    </div>
                    <div className="login__difference-login__method">
                        <img src={facebookIcon} alt="Login Fitfood with Facebook" />
                    </div>
                </div>
            </div>
        </ErrorBoundaryComponent>

    );
}

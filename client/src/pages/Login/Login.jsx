import React from 'react';
import "./Login.scss";
import { Link } from "react-router-dom";
import Form from '../../components/Form/Form';
import UsernameIcon from "../../assets/icons/username.png";
import facebookIcon from "../../assets/icons/facebook.png";
import appleIcon from "../../assets/icons/appleid.png";
import googleIcon from "../../assets/icons/google.png";


export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='login'>
            <h3 className="login__header">Đăng nhập vào Fitfood</h3>
            <div className="login__description body4">Bạn không có tài khoản? <Link to='/register'>Đăng ký tại đây</Link></div>
            <form className='loginForm'>
                <Form.Input placeHolder="Tài khoản" icon={UsernameIcon} />
                <Form.InputPassword placeHolder="Mật khẩu" />
                <Form.ForgotPasswordText />
                <Form.SubmitButton text="Đăng nhập" handleSubmit={handleSubmit} />
            </form>

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
    );
}

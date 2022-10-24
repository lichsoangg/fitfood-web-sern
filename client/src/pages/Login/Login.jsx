import React from 'react';
import "./Login.scss";
import { Link } from "react-router-dom";
import LoginForm from './LoginForm/LoginForm';
import Form from '../../components/Form/Form';
import UsernameIcon from "../../assets/svg/username.svg";
export default function Login() {
    return (
        <div className='login'>
            <h3 className="login__header">Đăng nhập vào Fitfood</h3>
            <div className="login__description body4">Bạn không có tài khoản? <Link to='/register'>Đăng ký tại đây</Link></div>
            <LoginForm>
                <Form.Input placeHolder="Tài khoản" icon={UsernameIcon} />
                <Form.InputPassword placeHolder="Mật khẩu" />
            </LoginForm>
        </div>
    );
}

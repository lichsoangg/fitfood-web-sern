import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useLayoutEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import appleIcon from "../../assets/icons/appleid.png";
import facebookIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google.png";
import UsernameIcon from "../../assets/icons/username.png";
import Error from '../../components/Error/Error';
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent';
import Form from '../../components/Form/Form';
import { setCredentials, selectCurrentToken } from '../../features/authSlice';
import "./Login.scss";
import { useLoginMutation } from './loginApi';

const schema = yup.object({
    username: yup.string().required("Tài khoản là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),

}).required();

export default function Login() {
    //router dom
    const navigate = useNavigate();
    //react-hook-form
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { handleSubmit } = methods;

    //redux-tookit
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();

    //change to page previous when have token
    const token = useSelector(selectCurrentToken);
    useLayoutEffect(() => {
        if (token) {
            navigate(-1, { replace: true });
        }
    }, [token,navigate]);
    //handle submit login
    const onSubmit = async (data) => {
        try {
            const user = await login(data).unwrap();
            const { Username, IsAdmin, accessToken } = user;
            dispatch(setCredentials(Username, IsAdmin, accessToken));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <ErrorBoundaryComponent>
            <div className='login'>
                <h3 className="login__header">Đăng nhập vào Fitfood</h3>
                <div className="login__description body4">Bạn không có tài khoản? <Link to='/register'>Đăng ký tại đây</Link></div>
                <FormProvider {...methods}>
                    <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
                        <Form.Input placeHolder="Tài khoản*" icon={UsernameIcon} name="username" />
                        <Form.Input placeHolder="Mật khẩu*" name="password" type="password" />
                        <Form.ForgotPasswordText />
                        {error?.status === 401 && <Error errorMessage="Tài khoản hoặc mật khẩu không đúng" />}
                        <Form.SubmitButton text="Đăng nhập" handleSubmit={handleSubmit} isLoading={isLoading} />
                    </form>
                </FormProvider>
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

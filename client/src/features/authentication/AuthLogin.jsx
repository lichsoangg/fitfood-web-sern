import React from 'react'
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { selectCurrentToken, setCredentials } from './authSlice';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Error from '../../components/Error/Error';
import UsernameIcon from "../../assets/icons/username.png";
import { useLoginMutation } from './authApi';

const schema = yup.object({
    username: yup.string().required("Tài khoản là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
}).required();
export default function AuthLogin() {
    const navigate = useNavigate();
    const location=useLocation();
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
    useEffect(() => {
        if (token) {
            navigate(location?.state?.from?.pathname || "/", { replace: true});
        }
    }, [token, navigate,location]);
    //handle submit login
    const onSubmit = async (data) => {
        try {
            const user = await login(data).unwrap();
            const { Username, IsAdmin, accessToken } = user;
            dispatch(setCredentials(Username, IsAdmin, accessToken));
        } catch (err) {
            console.warn(err);
        }
    };
  return (
      <FormProvider {...methods}>
          <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
              <Form.Input placeHolder="Tài khoản*" icon={UsernameIcon} name="username" />
              <Form.Input placeHolder="Mật khẩu*" name="password" type="password" />
              <Form.ForgotPasswordText />
              {error  && <Error errorMessage={error.data.message}/>}
              <Form.SubmitButton text="Đăng nhập" handleSubmit={handleSubmit} isLoading={isLoading} />
          </form>
      </FormProvider>
  )
}

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';
import Loading from '../../components/Loading/Loading';
import { SuccessNotify } from '../../components/Notify/Notify';
import path from '../../constants/path';
import { useResetPasswordMutation } from './authApi';

const schema = yup
  .object({
    Username: yup.string().email('Không đúng định dạng Email').required('Tài khoản là bắt buộc')
  })
  .required();

export default function AuthPasswordEmail() {
  const navigate = useNavigate();
  const methods = useForm({ resolver: yupResolver(schema) });
  const [resetPassword, { isLoading: isResetPasswordLoading, error: errorResetPassword }] = useResetPasswordMutation();
  const { handleSubmit } = methods;
  const onSubmit = async (data) => {
    const response = await resetPassword(data).unwrap();
    if (response?.status === 200) {
      SuccessNotify(response?.message, 5000);
      navigate(path.login);
    }
  };
  return (
    <FormProvider {...methods}>
      <form className='forgotPassword__form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Input name='Username'></Form.Input>
        {errorResetPassword && <Error errorMessage={errorResetPassword.data.message}></Error>}
        <Form.SubmitButton
          text='Khôi phục mật khẩu'
          styleButton={{ marginTop: '40px' }}
          isLoading={isResetPasswordLoading}
        />
      </form>
    </FormProvider>
  );
}

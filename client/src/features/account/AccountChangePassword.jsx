import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '../../components/Form/Form';
import * as yup from 'yup';
import { useChangePasswordMutation } from './accountApi';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import { SuccessNotify } from '../../components/Notify/Notify';
const schema = yup
  .object({
    password: yup.string().required('Mật khẩu hiện tại là bắt buộc'),
    newPassword: yup.string().required('Mật khẩu mới là bắt buộc').min(6, 'Mật khẩu mới tối thiểu là 6 kí tự'),
    confirmNewPassword: yup
      .string()
      .required('Xác nhận mật khẩu mới là bắt buộc')
      .oneOf([yup.ref('newPassword')], 'Xác nhận mật khẩu mới không đúng')
  })
  .required();

const initialData={
  password:'',
  newPassword:'',
  confirmNewPassword:'',
}
export default function AccountChangePassword() {
  //react-hook-form
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const { handleSubmit, reset, setError } = methods;

  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const onSubmit = async (data) => {
    const { password, newPassword } = data;
    const response = await changePassword({ password, newPassword });
    if (response?.error?.status === 401) {
      setError('password', { type: 'custom', message: response?.error?.data?.message });
    }
    if (response?.data?.status === 200) {
      SuccessNotify(response.data.message);
      reset(initialData);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className='changePasswordForm' onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <Form.Input placeHolder='Mật khẩu hiện tại*' name='password' type='password' />
          <hr />
          <Form.Input placeHolder='Mật khẩu mới*' name='newPassword' type='password' />
          <hr />
          <Form.Input placeHolder='Xác nhận mật khẩu mới*' name='confirmNewPassword' type='password' />
          <hr />
          {error && <Error errorMessage={error.data.message} />}
          <Form.SubmitButton text='Cập nhật mật khẩu' styleButton={{ width: '240px', marginLeft: 'auto' }} />
        </form>
      </FormProvider>

      {isLoading && <Loading size={3} full />}
    </>
  );
}

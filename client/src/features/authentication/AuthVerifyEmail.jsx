import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { isSchema } from 'yup';
import Form from '../../components/Form/Form';
import { useSendVerifyEmailMutation, useVerifyEmailMutation } from './authApi';
import * as yup from "yup";
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import { SuccessNotify } from '../../components/Notify/Notify';
import { useDispatch } from 'react-redux';
import { setActiveUser } from './authSlice';

const schema = yup.object({
  number1: yup.string().required(),
  number2: yup.string().required(),
  number3: yup.string().required(),
  number4: yup.string().required()
}).required();
export default function AuthVerifyEmail() {
  const methods = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const { handleSubmit } = methods;

  const [verifyEmail, { isLoading: isVerifyEmailLoading, error: errorVerifyEmail }] = useVerifyEmailMutation();
  const [sendVerifyEmail, { isLoading: isSendEmailLoading, error: errorSendVerifyEmail }] = useSendVerifyEmailMutation();
  const onSubmit = async (data) => {
    const code = `${data.number1}${data.number2}${data.number3}${data.number4}`;
    const response = await verifyEmail({ code }).unwrap();
    if (response?.status === 200) {
      SuccessNotify(response?.message);
      dispatch(setActiveUser(1));
    }
  };

  // const renderListInput=
  const handleSendEmail = async () => {
    const response = await sendVerifyEmail().unwrap();
    if (response?.status === 200) {
      SuccessNotify(response?.message);
    }
  };
  return (
    <FormProvider {...methods} >
      <form className='activePage__form' onSubmit={handleSubmit(onSubmit)}>
        <div className="activePage__form--inputs">
          <Form.InputNumberVerify maxLength={1} name='number1' />
          <Form.InputNumberVerify maxLength={1} name='number2' />
          <Form.InputNumberVerify maxLength={1} name='number3' />
          <Form.InputNumberVerify maxLength={1} name='number4' />
        </div>
        <span className='activePage__description description-right' onClick={handleSendEmail}>
          <strong>Gửi lại mã xác thực!</strong> </span>
        {errorVerifyEmail && <Error errorMessage={errorVerifyEmail.data.message}></Error>}
        {errorSendVerifyEmail && <Error errorMessage={errorSendVerifyEmail.data.message}></Error>}

        <Form.SubmitButton text="Xác nhận" styleButton={{ width: `100%` }} isLoading={isVerifyEmailLoading} />
      </form>
      {isSendEmailLoading && <Loading size={3} full />}
    </FormProvider>
  );
}

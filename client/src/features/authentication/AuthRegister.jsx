import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Form from '../../components/Form/Form';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import AccountForm from '../../pages/Register/AccountForm/AccountForm';
import AddressForm from '../../pages/Register/AddressForm/AddressForm';
import InformationForm from '../../pages/Register/InformationForm/InformationForm';

import { selectCurrentToken, setCredentials } from './authSlice';
import { useAddNewCustomerMutation, useCheckPhoneNumberMutation, useCheckUsernameMutation } from './authApi';
import Error from '../../components/Error/Error';

const schema = yup.object({
    username: yup.string().required("Tài khoản là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc").min(6, "Mật khẩu tối thiểu là 6 kí tự"),
    confirmPassword: yup.string().required("Xác nhận mật khẩu là bắt buộc").oneOf([yup.ref("password")], "Xác nhận mật khẩu không đúng"),
    name: yup.string().required("Họ tên là bắt buộc"),
    dayOfBirth: yup.string().required("Ngày sinh là bắt buộc"),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
    gender: yup.string().required("Giới tính là bắt buộc"),
    province: yup.string().required("Tỉnh là bắt buộc"),
    district: yup.string().required("Huyện là bắt buộc"),
    address: yup.string().required("Địa chỉ là bắt buộc"),
}).required();
export default function AuthRegister() {
    const dispatch=useDispatch();
    //React hook form
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { trigger, getValues, setError } = methods;

    //react router dom
    const navigate = useNavigate();
    const location=useLocation();
    //Custom hook: multiple step form
    const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
        <AccountForm />,
        <InformationForm />,
        <AddressForm />]);
    //registerAPI RTK
    const [addNewCustomer, { isLoading: isLoadingForm,error:errorAddNewCustomer }] = useAddNewCustomerMutation();
    const [checkUsername, { isLoading: isLoadingCheckUsername,error: errorCheckUsername }] = useCheckUsernameMutation();
    const [checkPhoneNumber, { isLoading: isLoadingCheckPhoneNumber, error: errorCheckPhonenumber }] = useCheckPhoneNumberMutation();

    //change to page previous when have token
    const token = useSelector(selectCurrentToken);
    useEffect(() => {
        if (token) {
            navigate(location?.state?.from?.pathname || "/" , { replace: true });
        }
    }, [token, navigate,location]);

    //Handle submit form
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = false;
        const value = getValues();

        if (currentStepIndex === 0) {
            isValid = await trigger(['username', 'password', 'confirmPassword']);
            if (isValid) {
                // check register username already exist
                try {
                    await checkUsername(value).unwrap().catch(err => {
                        if (err.status === 409) {
                            isValid = false;
                            setError('username', { type: "custom", message: "Tài khoản đã tồn tại" });
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }
        if (currentStepIndex === 1) {
            isValid = await trigger(['name', 'dayOfBirth', 'phoneNumber', 'gender']);
            if (isValid) {
                // check register phoneNumber already exist
                try {
                    await checkPhoneNumber(value).unwrap().catch(err => {
                        if (err.status === 409) {
                            isValid = false;
                            setError('phoneNumber', { type: "custom", message: "Số điện thoại đã tồn tại" });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }

            }
        }
        if (currentStepIndex === 2) isValid = await trigger(['province', 'district', 'ward', 'address']);
        // if valid and not last step next to step next in multi step form
        if (!isLastStep && isValid) next();
        //last step and valid validation submit register
        if (isLastStep && isValid) {
            try {
            const user= await addNewCustomer(value).unwrap();
             const {username,accessToken}=user;
            dispatch(setCredentials(username,0,accessToken));
            } catch (err) {
                console.log(err);
            }

        }
    };
    console.log(errorCheckUsername);
  return (
      <FormProvider {...methods}>
          <form className='registerForm' onSubmit={onSubmit}>
              {step}
              <Form.PaginateStepForm
                  back={back}
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                  textSubmit="Đăng ký"
                  isLoading={isLoadingForm || isLoadingCheckPhoneNumber || isLoadingCheckUsername}
              />
              {errorAddNewCustomer?.error && <Error errorMessage={errorAddNewCustomer.error} />}
              {errorAddNewCustomer?.data && <Error errorMessage={errorAddNewCustomer.data.message} />}

          </form>

      </FormProvider>
  )
}

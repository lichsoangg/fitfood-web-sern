import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../components/Form/Form';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import AccountForm from './AccountForm/AccountForm';
import AddressForm from './AddressForm/AddressForm';
import InformationForm from './InformationForm/InformationForm';
import "./Register.scss";
import { useAddNewCustomerMutation, useCheckPhoneNumberMutation, useCheckUsernameMutation } from './registerApi';
import ErrorBoundaryComponent from '../../components/ErrorComponent/ErrorComponent';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/authSlice';
import { useLayoutEffect } from 'react';

const schema = yup.object({
    username: yup.string().required("Tài khoản là bắt buộc"),
    password: yup.string().min(6, "Mật khẩu tối thiểu là 6 kí tự").required("Mật khẩu là bắt buộc"),
    confirmPassword: yup.string().required("Xác nhận mật khẩu là bắt buộc").oneOf([yup.ref("password")], "Xác nhận mật khẩu không đúng"),
    name: yup.string().required("Họ tên là bắt buộc"),
    dayOfBirth: yup.string().required("Ngày sinh là bắt buộc"),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
    gender: yup.string().required("Giới tính là bắt buộc"),
    province: yup.string().required("Tỉnh là bắt buộc"),
    district: yup.string().required("Huyện là bắt buộc"),
    address: yup.string().required("Địa chỉ là bắt buộc"),
}).required();

export default function Register() {
    //React hook form
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { trigger, getValues, setError } = methods;

    //react router dom
    const navigate = useNavigate();

    //Custom hook: multiple step form
    const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
        <AccountForm />,
        <InformationForm />,
        <AddressForm />]);
    //registerAPI RTK
    const [addNewCustomer, { isLoading: isLoadingForm }] = useAddNewCustomerMutation();
    const [checkUsername, { isLoading: isLoadingCheckUsername }] = useCheckUsernameMutation();
    const [checkPhoneNumber, { isLoading: isLoadingCheckPhoneNumber }] = useCheckPhoneNumberMutation();

    //change to page previous when have token
    const token = useSelector(selectCurrentToken);
    useLayoutEffect(() => {
        if (token) {
            navigate(-1, { replace: true });
        }
    }, [token,navigate]);

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
                await addNewCustomer(value).unwrap()
            } catch (err) {
                console.log(err);
            }

        }
    };
    return (
        <ErrorBoundaryComponent>
            <div className='register' >
                <h3 className="register__header">Tạo tài khoản Fitfood</h3>
                <div className="register__description body4">Bạn đã có tài khoản? <Link to='/login'>Đăng nhập tại đây</Link></div>

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
                    </form>

                </FormProvider>
            </div>
        </ErrorBoundaryComponent>
    );
}

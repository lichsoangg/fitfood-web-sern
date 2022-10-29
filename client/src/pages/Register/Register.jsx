import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import AccountForm from './AccountForm/AccountForm';
import AddressForm from './AddressForm/AddressForm';
import InformationForm from './InformationForm/InformationForm';
import { FormProvider, useForm } from "react-hook-form";
import "./Register.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
    username: yup.string().required("Tài khoản là bắt buộc"),
    password: yup.string().min(6, "Mật khẩu tối thiểu là 6 kí tự").required("Mật khẩu là bắt buộc"),
    confirmPassword: yup.string().required("Xác nhận mật khẩu là bắt buộc").oneOf([yup.ref("password")], "Xác nhận mật khẩu không đúng"),
    name: yup.string().required("Họ tên là bắt buộc"),
    dayOfBirth: yup.string().required("Ngày sinh là bắt buộc"),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
    gender: yup.string().required("Giới tính là bắt buộc")

}).required();

export default function Register() {
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { trigger, getValues } = methods;
    const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
        <AccountForm />,
        <InformationForm />,
        <AddressForm />]);
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = false;
        if (currentStepIndex === 0) isValid = await trigger(['username', 'password', 'confirmPassword']);
        if (currentStepIndex === 1) isValid = await trigger(['name', 'dayOfBirth', 'phoneNumber', 'gender']);
        if (currentStepIndex === 2) isValid = await trigger(['province', 'district', 'ward', 'address']);

        if (!isLastStep && isValid) next();
        if (isLastStep && isValid) {
            const value = getValues();
            console.log(value);
        }
    };
    return (
        <div className='register' >
            <h3 className="register__header">Tạo tài khoản Fitfood</h3>
            <div className="register__description body4">Bạn đã có tài khoản? <Link to='/login'>Đăng nhập tại đây</Link></div>
            <FormProvider {...methods}>
                <form className='registerForm' onSubmit={onSubmit}>
                    {step}
                    <Form.PaginateStepForm back={back} isFirstStep={isFirstStep} isLastStep={isLastStep} textSubmit="Đăng ký" />
                </form>
            </FormProvider>
        </div>
    );
}

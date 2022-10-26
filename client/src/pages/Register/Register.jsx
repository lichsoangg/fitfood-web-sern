import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import AccountForm from './AccountForm/AccountForm';
import AddressForm from './AddressForm/AddressForm';
import InformationForm from './InformationForm/InformationForm';
import "./Register.scss";

export default function Register() {
    const { step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
        <AccountForm />,
        <InformationForm />,
        <AddressForm />]);


    const handleSubmit = (e) => {
        e.preventDefault();
        next();
    };
    return (
        <div className='register'>
            <h3 className="register__header">Tạo tài khoản Fitfood</h3>
            <div className="register__description body4">Bạn đã có tài khoản? <Link to='/login'>Đăng nhập tại đây</Link></div>
            <form className='registerForm' onSubmit={handleSubmit}>
                {step}
                <Form.PaginateStepForm next={handleSubmit} back={back} isFirstStep={isFirstStep} isLastStep={isLastStep} textSubmit="Đăng ký" />
            </form>


        </div>
    );
}

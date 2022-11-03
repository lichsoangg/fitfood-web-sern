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
    ward:yup.string().required("Xã là bắt buộc"),
    address:yup.string().required("Địa chỉ là bắt buộc"),
}).required();

export default function Register() {
    //React hook form
    const methods = useForm({
        resolver: yupResolver(schema)
    });
    const { trigger, getValues,setError } = methods;

    //react router dom
    const navigate=useNavigate();

    //Custom hook: multiple step form
    const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
        <AccountForm />,
        <InformationForm />,
        <AddressForm />]);
    //registerAPI RTK
    const [addNewCustomer, {isLoading:isLoadingForm,error}]=useAddNewCustomerMutation();
    const [checkUsername,{isLoading:isLoadingCheckUsername}]= useCheckUsernameMutation();
    const [checkPhoneNumber,{isLoading:isLoadingCheckPhoneNumber}]=useCheckPhoneNumberMutation();
    //Handle submit form
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = false;
        const value = getValues();
        if (currentStepIndex === 0){
            isValid = await trigger(['username', 'password', 'confirmPassword']);
            if (isValid)
            {
                await checkUsername(value).unwrap().catch(err => {
                    if (err.status === 409) {
                        isValid = false;
                        setError('username', { type: "custom", message: "Tài khoản đã tồn tại" });
                    }
                });
            }  
        } 
        if (currentStepIndex === 1){
            isValid = await trigger(['name', 'dayOfBirth', 'phoneNumber', 'gender']);
            if(isValid){
                await checkPhoneNumber(value).unwrap().catch(err=>{
                    if(err.status===409){
                        isValid=false;
                        setError('phoneNumber', { type: "custom", message: "Số điện thoại đã tồn tại" });
                    }
                })
            }
        } 
        if (currentStepIndex === 2) isValid = await trigger(['province', 'district', 'ward', 'address']);
        if (!isLastStep && isValid) next();
        if (isLastStep && isValid) {
                await addNewCustomer(value).unwrap().then((response)=>{
                    if (response.status===201){
                        navigate(-1);
                    }
                 
                });
        }
    };  
    return (
        <div className='register' >
            <h3 className="register__header">Tạo tài khoản Fitfood</h3>
            <div className="register__description body4">Bạn đã có tài khoản? <Link to='/login'>Đăng nhập tại đây</Link></div>

            <FormProvider {...methods}>
                <form className='registerForm' onSubmit={onSubmit}>
                    {step}
                    <Form.PaginateStepForm back={back} isFirstStep={isFirstStep} isLastStep={isLastStep} textSubmit="Đăng ký" isLoading={isLoadingForm|| isLoadingCheckPhoneNumber|| isLoadingCheckUsername} />
                </form>
            </FormProvider>
        </div>
    );
}

import React from 'react';
import "./Form.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from "react-hook-form";
import showPasswordIcon from "../../assets/icons/showPassword.png";
import hidePasswordIcon from "../../assets/icons/hidePassword.png";
import dateIcon from "../../assets/icons/calendar.png";
import downIcon from "../../assets/icons/down.png";
import Error from './Error/Error';
import Portal from '../Portal/Portal';
import { useClickOutsideModal } from '../../hooks/useClickOutsideModal';
export default function Form() {
    return null;
}

function Input({ placeHolder, icon, name, ...rest }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="formInput">
            <input type="text" className='formInput__input' placeholder=" " {...rest} {...register(name)} />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            {icon &&
                <div className='formInput__icon'>
                    <img src={icon} alt="" />
                </div>}

            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );
}
function InputPassword({ placeHolder, name, ...rest }) {
    const { register, formState: { errors } } = useFormContext();
    const [show, setShow] = useState(false);
    const handleClickTogglePassword = () => {
        setShow(!show);
    };

    return (
        <div className="formInput">
            <input type={show ? "text" : "password"} className='formInput__input' placeholder=" " {...rest} {...register(name)} />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon' onClick={handleClickTogglePassword}>
                <img src={show ? showPasswordIcon : hidePasswordIcon} alt="Fitfood Password icon" />
            </div>
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );

};
function InputDate({ placeHolder, name, ...rest }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="formInput">
            <input type="text" className='formInput__input'
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder=" "
                {...rest}
                {...register(name)} />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon'>
                <img src={dateIcon} alt="" />
            </div>
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );

};
function Dropdown({ data, placeHolder, icon, name, ...rest }) {
    const { register, setValue, getValues, formState: { errors } } = useFormContext();
    const [rect, setRect] = useState(null);
    const { open, setOpen, modalRef } = useClickOutsideModal();
    const handleClickDropdown = (e) => {
        setValue(name, e.target.getAttribute("data-id"));
    };
    const handleClickOpenModal = (e) => {
        setRect(e.target.parentNode.getBoundingClientRect());
        setOpen(true);
    };
    function getDataValueWithKey(key, data) {
        return data.filter(item => item.id === key * 1)[0]?.value;
    }
    const handleClickDropdownValue = (e) => {
        e.target.nextSibling.focus();
    };
    return (
        <div className="formInput formDropdown" ref={modalRef} onClick={handleClickOpenModal}>
            <span className='formInput__dropdownValue' onClick={handleClickDropdownValue}>{getValues(name) ? getDataValueWithKey(getValues(name), data) : ""}</span>
            <input type="text" className='formInput__input '
                placeholder=" "
                readOnly
                {...rest}
                {...register(name)} />

            <span className='formInput__placeHolder' >{placeHolder}</span>
            <div className='formInput__icon'>
                <img src={downIcon} alt="Fitfood Dropdown Icon" />
            </div>
            {(open && data) && <Portal overlay={false} styleContent={{ position: "absolute", left: `${rect.left + window.scrollX}px`, top: `${rect.top + rect.height + window.scrollY}px`, width: `${rect.width}px` }}>
                <div className="formInput__dropdown" onClick={handleClickDropdown} >
                    {data && data.map((item) => {
                        return <span key={item.id} data-id={item.id}>{item.value}</span>;
                    })}
                </div>
            </Portal>}
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
        );
}
function ForgotPasswordText() {
    return (
        <div className='formForgotPasswordText'>
            <Link>Quên mật khẩu?</Link>
        </div>
    );
}
function SubmitButton({ text, handleSubmit }) {
    return (
        <button type='submit' className='formSubmitButton' onClick={(e) => handleSubmit(e)}>
            {text}
        </button>
    );
}
function PaginateStepForm({ isFirstStep, isLastStep, back, textSubmit }) {
    return (
        <div className="formPaginateStepForm">
            {!isFirstStep && <button type="button" onClick={back} className="formPaginateStepForm__button-back">Trở về</button>}
            <button type="submit" className="formPaginateStepForm__button-submit">
                {isLastStep ? textSubmit : "Tiếp tục"}
            </button>
        </div>
    );
}


Form.Input = Input;
Form.InputPassword = InputPassword;
Form.InputDate = InputDate;
Form.ForgotPasswordText = ForgotPasswordText;
Form.SubmitButton = SubmitButton;
Form.PaginateStepForm = PaginateStepForm;
Form.Dropdown = Dropdown;

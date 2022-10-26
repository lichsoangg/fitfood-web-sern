import React from 'react';
import "./Form.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import showPasswordIcon from "../../assets/icons/showPassword.png";
import hidePasswordIcon from "../../assets/icons/hidePassword.png";
export default function Form() {
    return null;
}

function Input({ placeHolder, icon, ...rest }) {
    return (
        <div className="formInput">
            <input type="text" className='formInput__input' placeholder=" " {...rest} />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon'>
                <img src={icon} alt="" />
            </div>
        </div>
    );
}

function InputPassword({ placeHolder, ...rest }) {
    const [show, setShow] = useState(false);
    const handleClickTogglePassword = () => {
        setShow(!show);
    };
    return (
        <div className="formInput">
            <input type={show ? "text" : "password"} className='formInput__input' placeholder=" " {...rest} />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon' onClick={handleClickTogglePassword}>
                <img src={show ? showPasswordIcon : hidePasswordIcon} alt="Fitfood Password icon" />
            </div>
        </div>
    );

};

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
            <button type="submit" className="formPaginateStepForm__button-submit">{isLastStep ? textSubmit : "Tiếp tục"}</button>
        </div>
    );
}


Form.Input = Input;
Form.InputPassword = InputPassword;
Form.ForgotPasswordText = ForgotPasswordText;
Form.SubmitButton = SubmitButton;
Form.PaginateStepForm = PaginateStepForm;

import React from 'react';
import "./Form.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import showPasswordIcon from "../../assets/icons/showPassword.png";
import hidePasswordIcon from "../../assets/icons/hidePassword.png";
export default function Form() {
    return null;
}

function Input({ placeHolder, icon }) {
    return (
        <div className="formInput">
            <input type="text" className='formInput__input' placeholder=" " />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon'>
                <img src={icon} alt="" />
            </div>
        </div>
    );
}

function InputPassword({ placeHolder }) {
    const [show, setShow] = useState(false);
    const handleClickTogglePassword = () => {
        setShow(!show);
    };
    return (
        <div className="formInput">
            <input type={show ? "text" : "password"} className='formInput__input' placeholder=" " />
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



Form.Input = Input;
Form.InputPassword = InputPassword;
Form.ForgotPasswordText = ForgotPasswordText;
Form.SubmitButton = SubmitButton;

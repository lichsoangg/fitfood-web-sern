import React from 'react';
import "./Form.scss";
import showPasswordIcon from "../../assets/svg/showPassword.svg";
import hidePasswordIcon from "../../assets/svg/hidePassword.svg";
import { useState } from 'react';

export default function Form() {
    return null;
}

function Input({ placeHolder, icon }) {
    return (
        <div className="formInput">
            <input type="text" className='formInput__input' required />
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
            <input type={show ? "text" : "password"} className='formInput__input' required />
            <span className='formInput__placeHolder'>{placeHolder}</span>
            <div className='formInput__icon' onClick={handleClickTogglePassword}>
                <img src={show ? showPasswordIcon : hidePasswordIcon} alt="Fitfood Password icon" />
            </div>
        </div>
    );

};


Form.Input = Input;
Form.InputPassword = InputPassword;
import React from 'react';
import "./Form.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from "react-hook-form";
import showPasswordIcon from "../../assets/icons/showPassword.png";
import hidePasswordIcon from "../../assets/icons/hidePassword.png";
import dateIcon from "../../assets/icons/calendar.png";
import downIcon from "../../assets/icons/down.png";
import Error from '../Error/Error';
import Portal from '../Portal/Portal';
import { useClickOutsideModal } from '../../hooks/useClickOutsideModal';
import PropTypes from "prop-types";
export default function Form() {
    return null;
}


// input
function Input({ placeHolder, type, icon, name, ...rest }) {
    const { register, formState: { errors } } = useFormContext();
    const [show, setShow] = useState(type === "password" ? false : true);
    const handleClickTogglePassword = () => {
        setShow(!show);
    };
    return (
        <div className="formInput">
            <input
                type={show ? "text" : "password"}
                className='formInput__input' placeholder=" "
                style={{ border: `${errors[name] ? "0.8px solid red" : ""}` }}
                autoComplete="off"
                {...rest}
                {...register(name)}
            />
            <span
                className='formInput__placeHolder'
                style={{ color: `${errors[name] ? "red" : ""}` }}
            >{placeHolder}</span>
            {icon &&
                <div className='formInput__icon'>
                    <img src={icon} alt="" />
                </div>}
            {
                type === "password" &&
                <div className='formInput__icon' onClick={handleClickTogglePassword}>
                    <img src={show ? showPasswordIcon : hidePasswordIcon} alt="Fitfood Password icon" />
                </div>
            }
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );
}
Input.propTypes = {
    placeHolder:PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
};
Form.Input = Input;

//input data
function InputDate({ placeHolder, name, ...rest }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="formInput">
            <input type="text" className='formInput__input'
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder=" "
                autoComplete="off"
                style={{ border: `${errors[name] ? "0.8px solid red" : ""}` }}
                {...rest}
                {...register(name)} />
            <span className='formInput__placeHolder'
                style={{ color: `${errors[name] ? "red" : ""}` }}
            >{placeHolder}</span>
            <div className='formInput__icon'>
                <img src={dateIcon} alt="" />
            </div>
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );

};

InputDate.propTypes={
    placeHolder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
Form.InputDate = InputDate;

//dropdown
function Dropdown({ data, isLoading = false, trigger, placeHolder, icon, name, ...rest }) {

    //useFormComtext api react hook form
    const { register, setValue, getValues, watch, formState: { errors } } = useFormContext();
    //handle open modal
    const { open, setOpen, modalRef } = useClickOutsideModal();
    const [rect, setRect] = useState(null);
    const handleClickOpenModal = (e) => {
        setRect(e.target.parentNode.getBoundingClientRect());
        setOpen(true);
    };
    function getDataValueWithKey(key, data) {
        return data.filter(item => Number(item.id) === Number(key))[0]?.value;
    }
    const handleClickDropdown = (e) => {
        setValue(name, e.target.getAttribute("data-id"));
    };
    const handleClickDropdownValue = (e) => {
        trigger && watch(trigger) && e.target.nextSibling.focus();
        !trigger && e.target.nextSibling.focus();
    };
    return (
        <div className="formInput formDropdown" ref={modalRef} onClick={handleClickOpenModal}>
            <span className='formInput__dropdownValue' onClick={handleClickDropdownValue}>{getValues(name) ? getDataValueWithKey(getValues(name), data) : ""}</span>
            <input type="text" className='formInput__input '
                placeholder=" "
                readOnly
                autoComplete="off"
                {...rest}
                {...register(name)}
                style={trigger ? {
                    pointerEvents: `${watch(trigger) ? "all" : "none"}`,
                    opacity: `${watch(trigger) ? 1 : 0.4}`,
                    border: `${errors[name] ? "0.8px solid red" : ""}`
                } :
                    { border: `${errors[name] ? "0.8px solid red" : ""}` }}

            />

            <span className='formInput__placeHolder'
                style={{ color: `${errors[name] ? "red" : ""}` }}
            >{placeHolder}
                {(isLoading) &&
                    <i className="fa fa-spinner fa-spin" style={{ marginLeft: "20px" }}></i>
                }
            </span>

            <div className='formInput__icon'>
                <img src={downIcon} alt="Fitfood Dropdown Icon" />
            </div>
            {(open && data) && <Portal overlay={false} styleContent={{ position: "absolute", left: `${rect.left + window.scrollX}px`, top: `${rect.top + rect.height + window.scrollY + 4}px`, width: `${rect.width}px` }}>
                <div className="formInput__dropdown" onClick={handleClickDropdown} >
                    {(isLoading) &&
                        <div className='formInput__dropdown--loadingIcon'>
                            <i className="fa fa-spinner fa-spin fa-2x"></i>
                        </div>
                    }
                    {(!isLoading && data) && data.map((item) => {
                        return <span key={item.id} data-id={item.id}>{item.value}</span>;
                    })}
                </div>
            </Portal>}
            {errors[`${name}`] && <Error errorMessage={errors[`${name}`].message} />}
        </div>
    );
}

Dropdown.propTypes={
    data: PropTypes.array,
    isLoading:PropTypes.bool,
    trigger:PropTypes.string,
    placeHolder: PropTypes.string.isRequired,
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
}
Form.Dropdown = Dropdown;


//Forgot Password Text
function ForgotPasswordText() {
    return (
        <div className='formForgotPasswordText'>
            <Link>Quên mật khẩu?</Link>
        </div>
    );
}
Form.ForgotPasswordText = ForgotPasswordText;

//Submit button
function SubmitButton({ text, handleSubmit }) {
    return (
        <button type='submit' className='formSubmitButton' onClick={(e) => handleSubmit(e)}>
            {text}
        </button>
    );
}
SubmitButton.propTypes={
    text:PropTypes.string.isRequired,
    handleSubmit:PropTypes.func.isRequired,
}
Form.SubmitButton = SubmitButton;

//paginate step form
function PaginateStepForm({ isFirstStep, isLastStep, back, textSubmit, isLoading }) {
    const textButton = isLoading ? "" : isLastStep ? textSubmit : "Tiếp tục";
    return (
        <div className="formPaginateStepForm" style={{ opacity: `${isLoading ? "0.6" : "1"}` }}>
            {!isFirstStep && <button type="button" onClick={back} className="formPaginateStepForm__button-back" disabled={isLoading} >Trở về</button>}
            <button type="submit" className="formPaginateStepForm__button-submit" disabled={isLoading}>
                {isLoading && <i className="fa fa-spinner fa-spin"></i>}
                {textButton}
            </button>
        </div>
    );
}
PaginateStepForm.propTypes={
    isFirstStep: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    back: PropTypes.func.isRequired,
    textSubmit: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

Form.PaginateStepForm = PaginateStepForm;

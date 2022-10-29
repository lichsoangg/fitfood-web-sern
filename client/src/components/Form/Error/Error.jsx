import React from 'react';
import dangerIcon from "../../../assets/svg/danger.svg";
import "./Error.scss";
export default function Error({ errorMessage }) {
    return (
        <div className='error'>
            <img src={dangerIcon} alt="danger icon fitfood" className='error__image' />
            <span className='error__message'>{errorMessage}</span>
        </div>
    );
}

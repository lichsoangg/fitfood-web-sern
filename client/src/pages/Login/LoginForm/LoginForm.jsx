import React from 'react';
import "./LoginForm.scss";

export default function LoginForm({ children }) {
    return (
        <form className='loginForm'>
            {children}
        </form>
    );
}



import React from 'react';
import UsernameIcon from "../../../assets/icons/username.png";
import Form from '../../../components/Form/Form';

export default function AccountForm() {
    return (
        <>
            <Form.Input placeHolder="Tài khoản*" icon={UsernameIcon} name="username" />
            <Form.InputPassword placeHolder="Mật khẩu*" name="password" />
            <Form.InputPassword placeHolder="Xác nhận mật khẩu*" name="confirmPassword" />
        </>
    );
}

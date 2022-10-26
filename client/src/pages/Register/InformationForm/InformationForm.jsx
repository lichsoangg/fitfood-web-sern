import React from 'react';
import Form from '../../../components/Form/Form';

export default function InformationForm() {
    return (
        <>
            <Form.InputPassword placeHolder="Họ tên" />
            <Form.InputPassword placeHolder="Ngày sinh" />
            <Form.InputPassword placeHolder="Số điện thoại" />
            <Form.InputPassword placeHolder="Giới tính" />
        </>
    );
}

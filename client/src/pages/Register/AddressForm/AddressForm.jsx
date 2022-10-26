import React from 'react';
import Form from '../../../components/Form/Form';

export default function AddressForm() {
    return (
        <>
            <Form.InputPassword placeHolder="Tỉnh" />
            <Form.InputPassword placeHolder="Quận" />
            <Form.InputPassword placeHolder="Xã" />
            <Form.InputPassword placeHolder="Địa chỉ" />
        </>
    );
}

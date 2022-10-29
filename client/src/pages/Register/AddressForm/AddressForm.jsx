import React from 'react';
import Form from '../../../components/Form/Form';

export default function AddressForm() {
    return (
        <>
            <Form.Dropdown placeHolder="Tỉnh" name="province" />
            <Form.Dropdown placeHolder="Huyện" name="district"   />
            <Form.Dropdown placeHolder="Xã" name="ward" />
            <Form.Input placeHolder="Địa chỉ" name="address" />
        </>
    );
}
 
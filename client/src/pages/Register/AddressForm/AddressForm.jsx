import React from 'react';
import { useFormContext } from 'react-hook-form';
import Form from '../../../components/Form/Form';
import {useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from "../../../features/api/apiProvince.jsx";
export default function AddressForm() {
    const {watch}=useFormContext();
    const {data:provinces,isFetching:provincesLoading}=useGetProvincesQuery();
    const { data:districts,isFetching :districtsLoading} = useGetDistrictsQuery(watch('province'),{
        skip: !watch('province')
    });
    const {data:wards, isFetching: wardsLoading}=useGetWardsQuery(watch('district'),{
        skip: !watch('district')
    });
    
    return (
        <>
            <Form.Dropdown placeHolder="Tỉnh" name="province" data={provinces} isLoading={provincesLoading}/>
            <Form.Dropdown placeHolder="Huyện" name="district" trigger="province" data={districts} isLoading={districtsLoading} />
            <Form.Dropdown placeHolder="Xã" name="ward" trigger="ward" data={wards} isLoading={wardsLoading}/>
            <Form.Input placeHolder="Địa chỉ" name="address" />
        </>
    );
}

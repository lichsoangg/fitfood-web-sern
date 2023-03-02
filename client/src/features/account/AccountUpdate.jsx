import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import manAvatar from '../../assets/images/man_avatar.png'
import womanAvatar from '../../assets/images/woman_avatar.png'
import { AcceptButton, CancelButton, InputButton, MainButton } from '../../components/Buttons/Buttons'
import Error from '../../components/Error/Error'
import Form from '../../components/Form/Form'
import Loading from '../../components/Loading/Loading'
import { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from '../api/apiProvince'
import { useCheckPhoneNumberMutation } from '../authentication/authApi'
import { useGetMeQuery, useUpdateAccountMutation } from './accountApi'
const dataGender = [
  { id: 1, value: 'Nam' },
  { id: 2, value: 'Nữ' }
]
const schema = yup
  .object({
    Name: yup.string().required('Họ tên là bắt buộc'),
    DayOfBirth: yup.string().required('Ngày sinh là bắt buộc'),
    PhoneNumber: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không đúng định dạng'),
    Gender: yup.string().required('Giới tính là bắt buộc'),
    Province: yup.string().required('Tỉnh là bắt buộc'),
    District: yup.string().required('Huyện là bắt buộc'),
    Address: yup.string().required('Địa chỉ là bắt buộc')
  })
  .required()
export default function AccountUpdate() {
  const [update, setUpdate] = useState(false)
  const [fileAvatar, setFileAvatar] = useState(null)
  const methods = useForm({ resolver: yupResolver(schema) })
  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isDirty }
  } = methods
  const { data } = useGetMeQuery()
  const user = data?.data
  const { data: provinces, isFetching: provincesLoading } = useGetProvincesQuery()
  const { data: districts, isFetching: districtsLoading } = useGetDistrictsQuery(watch('Province'), {
    skip: !watch('Province')
  })
  const { data: wards, isFetching: wardsLoading } = useGetWardsQuery(watch('District'), {
    skip: !watch('District')
  })
  const [updateAccount, { isLoading: isUpdateAccountLoading, error: errorUpdateAccount }] = useUpdateAccountMutation()

  const [checkPhoneNumber] = useCheckPhoneNumberMutation()
  let avatar = user?.Avatar ? user?.Avatar : user?.Gender === 0 ? manAvatar : womanAvatar

  //handle submit save update account
  const onSubmit = async (data) => {
    const { ID, IsActive, Role, Username, ...dataSubmit } = data
    let isValid = true
    if (data.PhoneNumber !== user.PhoneNumber) {
      await checkPhoneNumber({ phoneNumber: data.PhoneNumber, username: data.Username })
        .unwrap()
        .catch((err) => {
          if (err.status === 409) {
            isValid = false
            setError('PhoneNumber', { type: 'custom', message: 'Số điện thoại đã tồn tại' })
          }
        })
    }
    // const dayOfBirthCopy = new Date(dataSubmit.DayOfBirth)
    // const dayOfBirthFormat = moment(dayOfBirthCopy).format('YYYY-MM-DD')
    // dataSubmit.DayOfBirth = dayOfBirthFormat
    if (isValid) {
      let formData = new FormData()
      for (const key in dataSubmit) {
        formData.append(key, dataSubmit[key])
      }

      if (fileAvatar) {
        formData.append('UserAvatar', fileAvatar)
      } else {
        formData.delete('UserAvatar')
      }
      const response = await updateAccount(formData).unwrap()
      if (response.status === 200) {
        setFileAvatar(null)
      }
    }
  }

  //reset form
  const resetForm = useCallback(() => {
    reset(user)
  }, [user, reset])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleClickCancel = () => {
    resetForm()
    setFileAvatar(null)
    setUpdate(false)
  }

  //disable save button when form doesn't change
  let saveButtonStyle = { opacity: '0.4', pointerEvents: 'none' }
  if (isDirty) {
    saveButtonStyle = { opacity: '1', pointerEvents: 'auto' }
  }
  if (fileAvatar) {
    saveButtonStyle = { opacity: '1', pointerEvents: 'auto' }
  }
  return (
    <>
      {user && (
        <FormProvider {...methods}>
          <form className='accountInformation__form' onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className='accountInformation__form--top'>
              <div className='accountInformation__form--top-image'>
                <img src={fileAvatar ? URL.createObjectURL(fileAvatar) : avatar} alt='' />
              </div>
              {!update && (
                <MainButton type='button' onClick={() => setUpdate(true)}>
                  Chỉnh sửa
                </MainButton>
              )}
              {update && <InputButton onChange={(e) => setFileAvatar(e.target.files[0])}>Đổi ảnh</InputButton>}
              <div className='accountInformation__form--top-form-buttons'>
                {update && <AcceptButton styleButton={saveButtonStyle}>Cập nhật</AcceptButton>}
                {update && <CancelButton onClick={handleClickCancel}>Huỷ</CancelButton>}
              </div>
            </div>
            <hr />
            <div className='accountInformation__form--inputs' style={{ pointerEvents: update ? 'auto' : 'none' }}>
              <Form.Input placeHolder='Họ tên' name='Name' />
              <Form.InputDate placeHolder='Ngày sinh' name='DayOfBirth' />
              <Form.Input placeHolder='Số điện thoại' name='PhoneNumber' />
              <Form.Dropdown placeHolder='Giới tính' name='Gender' data={dataGender} />
            </div>
            <div className='accountInformation__form--inputs' style={{ pointerEvents: update ? 'auto' : 'none' }}>
              <Form.Dropdown placeHolder='Tỉnh' name='Province' data={provinces} isLoading={provincesLoading} />
              <Form.Dropdown
                placeHolder='Huyện'
                name='District'
                trigger='Province'
                data={districts}
                isLoading={districtsLoading}
              />
              <Form.Dropdown placeHolder='Xã' name='Ward' trigger='Ward' data={wards} isLoading={wardsLoading} />
              <Form.Input placeHolder='Địa chỉ' name='Address' />
            </div>
          </form>
        </FormProvider>
      )}
      {errorUpdateAccount && (
        <Error styleError={{ marginTop: '24px' }} errorMessage={errorUpdateAccount.data.message}></Error>
      )}

      {isUpdateAccountLoading && <Loading size={3} full />}
    </>
  )
}

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Form from '../../../components/Form/Form'
import { useMultiStepForm } from '../../../hooks/useMultiStepForm'
import AccountForm from './AccountForm/AccountForm'
import AddressForm from './AddressForm/AddressForm'
import InformationForm from './InformationForm/InformationForm'
import Error from '../../../components/Error/Error'
import {
  useAddNewCustomerMutation,
  useCheckPhoneNumberMutation,
  useCheckUsernameMutation,
  useSendVerifyEmailMutation
} from '../../../features/authentication/authApi'
import { selectCurrentToken, setCredentials } from '../../../features/authentication/authSlice'
import path from '../../../constants/path'

const schema = yup
  .object({
    Username: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
    Password: yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu tối thiểu là 6 kí tự'),
    ConfirmPassword: yup
      .string()
      .required('Xác nhận mật khẩu là bắt buộc')
      .oneOf([yup.ref('Password')], 'Xác nhận mật khẩu không đúng'),
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
export default function AuthRegister() {
  const dispatch = useDispatch()
  //React hook form
  const methods = useForm({
    resolver: yupResolver(schema)
  })
  const { trigger, getValues, setError } = methods

  //react router dom
  const navigate = useNavigate()
  const location = useLocation()

  //Custom hook: multiple step form
  const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
    <AccountForm />,
    <InformationForm />,
    <AddressForm />
  ])
  //registerAPI RTK
  const [addNewCustomer, { isLoading: isLoadingForm, error: errorAddNewCustomer }] = useAddNewCustomerMutation()
  const [checkUsername, { isLoading: isLoadingCheckUsername }] = useCheckUsernameMutation()
  const [checkPhoneNumber, { isLoading: isLoadingCheckPhoneNumber }] = useCheckPhoneNumberMutation()
  const [sendVerifyEmail, { isLoading: isSendEmailLoading }] = useSendVerifyEmailMutation()

  //change to page previous when have token
  const token = useSelector(selectCurrentToken)
  useEffect(() => {
    if (token) {
      const previousPathname = location?.state?.from?.pathname
      navigate(previousPathname || path.accountInfo, { replace: true })
    }
  }, [token, navigate, location?.state?.from?.pathname])

  //Handle submit form
  const onSubmit = async (e) => {
    e.preventDefault()
    let isValid = false
    const value = getValues()

    if (currentStepIndex === 0) {
      isValid = await trigger(['Username', 'Password', 'ConfirmPassword'])
      if (isValid) {
        // check register username already exist
        try {
          await checkUsername({ Username: value.Username })
            .unwrap()
            .catch((err) => {
              if (err.status === 409) {
                isValid = false
                setError('Username', { type: 'custom', message: 'Tài khoản đã tồn tại' })
              }
            })
        } catch (err) {
          setError('PhoneNumber', { type: 'custom', message: e.message })
        }
      }
    }
    if (currentStepIndex === 1) {
      isValid = await trigger(['Name', 'DayOfBirth', 'PhoneNumber', 'Gender'])
      if (isValid) {
        // check register phoneNumber already exist
        try {
          await checkPhoneNumber(value)
            .unwrap()
            .catch((err) => {
              if (err.status === 409) {
                isValid = false
                setError('PhoneNumber', { type: 'custom', message: 'Số điện thoại đã tồn tại' })
              }
            })
        } catch (error) {
          setError('PhoneNumber', { type: 'custom', message: error.message })
        }
      }
    }
    if (currentStepIndex === 2) isValid = await trigger(['Province', 'District', 'Ward', 'Address'])
    // if valid and not last step next to step next in multi step form
    if (!isLastStep && isValid) next()
    //last step and valid validation submit register
    if (isLastStep && isValid) {
      try {
        delete value.ConfirmPassword
        value.Role = 2
        const data = await addNewCustomer(value).unwrap()
        const { data: user } = data
        const { Username: username, IsActive: isActive, AccessToken: accessToken } = user
        dispatch(setCredentials(username, isActive, 1, accessToken))
        if (accessToken) {
          await sendVerifyEmail().unwrap()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <FormProvider {...methods}>
      <form className='registerForm' onSubmit={onSubmit}>
        {step}
        <Form.GroupButton
          back={back}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          textSubmit='Đăng ký'
          isLoading={isLoadingForm || isLoadingCheckPhoneNumber || isLoadingCheckUsername || isSendEmailLoading}
        />
        {errorAddNewCustomer?.error && <Error errorMessage={errorAddNewCustomer.error} />}
        {errorAddNewCustomer?.data && <Error errorMessage={errorAddNewCustomer.data.message} />}
      </form>
    </FormProvider>
  )
}

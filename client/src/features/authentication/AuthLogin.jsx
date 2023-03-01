import React from 'react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Form from '../../components/Form/Form'
import { selectCurrentAuth, setCredentials, selectCurrentToken } from './authSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Error from '../../components/Error/Error'
import UsernameIcon from '../../assets/icons/username.png'
import { useLoginMutation } from './authApi'
import path from '../../constants/path'
import { ROLES } from '../../constants/utils'

const schema = yup
  .object({
    username: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
    password: yup.string().required('Mật khẩu là bắt buộc')
  })
  .required()
export default function AuthLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  //react-hook-form
  const methods = useForm({
    resolver: yupResolver(schema)
  })
  const { handleSubmit } = methods

  //redux-tookit
  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()

  //change to page previous when have token
  const { role } = useSelector(selectCurrentAuth)
  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    if (token) {
      if (Number(role) === Number(ROLES.ADMIN)) {
        navigate(path.admin)
      }
      if (Number(role) === Number(ROLES.CUSTOMER)) {
        navigate(location?.state?.from?.pathname || path.home, { replace: true })
      }
    }
  }, [token, navigate, location, role])
  //handle submit login
  const onSubmit = async (data) => {
    try {
      const user = await login(data).unwrap()
      const {
        data: { Username, IsActive, Role, AccessToken }
      } = user
      dispatch(setCredentials(Username, IsActive, Role, AccessToken))
    } catch (err) {
      console.warn(err)
    }
  }
  return (
    <FormProvider {...methods}>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <Form.Input placeHolder='Email *' icon={UsernameIcon} name='username' />
        <Form.Input placeHolder='Mật khẩu*' name='password' type='password' />
        <Form.ForgotPasswordText />
        {error?.data && <Error errorMessage={error.data.message} />}
        {error?.error && <Error errorMessage={error.error} />}

        <Form.SubmitButton text='Đăng nhập' isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}

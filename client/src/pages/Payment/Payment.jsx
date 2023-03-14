/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import Form from '../../components/Form/Form'
import { ErrorNotify, SuccessNotify } from '../../components/Notify/Notify'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import { useBuyProductsMutation, useGetPurchaseQuery } from '../../features/purchase/purchaseApi'
import { useDisableClick } from '../../hooks/useDisableClick'
import { useMultiStepForm } from '../../hooks/useMultiStepForm'
import PaymentCart from './components/PaymentCart/PaymentCart'
import PaymentInfo from './components/PaymentInfo/PaymentInfo'
import PaymentMethod from './components/PaymentMethod/PaymentMethod'
import PaymentSuccess from './components/PaymentSuccess'
import { Helmet } from 'react-helmet-async'

import './Payment.scss'

const schema = yup
  .object({
    Name: yup.string().required('Họ tên là bắt buộc'),
    PhoneNumber: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không đúng định dạng'),
    Province: yup.string().required('Tỉnh là bắt buộc'),
    District: yup.string().required('Huyện là bắt buộc'),
    Address: yup.string().required('Địa chỉ là bắt buộc')
  })
  .required()
export default function Payment() {
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  const { data: productsInCartData, isFetching: isProductsInCartFetching } = useGetPurchaseQuery(
    { state: -1 },
    { skip: !isAuthenticated }
  )
  const methods = useForm({
    resolver: yupResolver(schema)
  })
  const { trigger, getValues, setValue } = methods
  const cartProducts = productsInCartData?.data?.data

  //Custom hook: multiple step form
  const { currentStepIndex, setCurrentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
    <PaymentCart
      cartProducts={cartProducts}
      isProductsInCartFetching={isProductsInCartFetching}
      isAuthenticated={isAuthenticated}
    />,
    <PaymentInfo />,
    <PaymentMethod />,
    <PaymentSuccess />
  ])
  const [buyProducts, { isLoading: isBuyProductsLoading }] = useBuyProductsMutation()
  //handle line status
  const [widthActiveLine, setWidthActiveLine] = useState()
  useEffect(() => {
    let activeItems = document.querySelectorAll('.payment__status--item-active')
    if (activeItems?.length === 3) {
      setWidthActiveLine(`100%`)
    } else {
      let lastActiveItems = activeItems[activeItems?.length - 1]
      setWidthActiveLine(`${lastActiveItems?.offsetLeft}px`)
    }
  }, [currentStepIndex])
  const handleClickSetActive = (stepActive) => {
    setCurrentStepIndex(stepActive)
  }
  //handleSubmit Buy Producst
  const onSubmit = async (e) => {
    e.preventDefault()
    let isValid = true
    const value = getValues()
    if (currentStepIndex === 1) {
      isValid = await trigger(['Name', 'PhoneNumber', 'Province', 'District', 'Address'])
      if (isValid) {
        const dropdownTextDoms = document.querySelectorAll('.formInput__dropdownValue')
        setValue('ProvinceValue', dropdownTextDoms[0].innerHTML)
        setValue('DistrictValue', dropdownTextDoms[1].innerHTML)
        setValue('WardValue', dropdownTextDoms[2].innerHTML)
      }
    }

    if (currentStepIndex === 2) {
      let { Name, PhoneNumber, ProvinceValue, DistrictValue, Address, WardValue } = value
      ProvinceValue = ProvinceValue ? `${ProvinceValue}\ ` : ''
      DistrictValue = ProvinceValue ? `${DistrictValue}\ ` : ''
      WardValue = ProvinceValue ? `${WardValue}\ ` : ''
      Address = Address ? Address : ''
      const addressString = `${ProvinceValue}${DistrictValue}${WardValue}${Address}`
      const dateNow = new Date().toISOString().slice(0, 10)
      const Products = cartProducts.map((cartProduct) => {
        return { ProductID: cartProduct.ProductID, Quantity: cartProduct.Quantity, SalePrice: cartProduct.Price }
      })
      const dataInput = { Name, PhoneNumber, State: 1, Address: addressString, Date: dateNow, Products }
      try {
        const response = await buyProducts(dataInput).unwrap()
        if (response.status === 200) {
          SuccessNotify('Đặt hàng thành công')
        }
      } catch (error) {
        ErrorNotify(error.data.message)
        isValid = false
      }
    }
    if (!isLastStep && isValid) next()
  }
  useDisableClick(isBuyProductsLoading)
  return (
    <div className='payment mainWrapper container'>
      <Helmet>
        {/* HTML Meta Tags */}
        <title>Thanh toán - Fitfood</title>
        <meta name='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content='Thanh toán - Fitfood' />
        <meta itemProp='description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta itemProp='image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        {/* Facebook Meta Tags */}
        <meta property='og:url' content='https://www.fitfood.kd14.me' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Thanh toán - Fitfood' />
        <meta property='og:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta property='og:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Thanh toán - Fitfood' />
        <meta name='twitter:description' content='Ghé Fitfood để lựa chọn những thực phẩm chất lượng nhé!' />
        <meta name='twitter:image' content='https://api.fitfood.kd14.me/images/slider_homepage2.jpeg' />
      </Helmet>
      {cartProducts?.length < 1 || currentStepIndex === 3 ? null : (
        <div className='payment__status'>
          <div className='payment__status--line'></div>
          <div
            className='payment__status--line payment__status--line-active'
            style={{ width: `${widthActiveLine}` }}
          ></div>
          <div className='payment__status--item payment__status--item-active' onClick={() => handleClickSetActive(0)}>
            <div className='circle'>1</div>
            <span>Kiểm tra giỏ hàng</span>
          </div>
          <div
            className={`payment__status--item ${currentStepIndex >= 1 ? 'payment__status--item-active' : ''}`}
            onClick={() => handleClickSetActive(1)}
          >
            <div className='circle'>2</div>
            <span>Xác nhận thông tin</span>
          </div>
          <div
            className={`payment__status--item ${currentStepIndex >= 2 ? 'payment__status--item-active' : ''}`}
            onClick={() => handleClickSetActive(2)}
          >
            <div className='circle'>3</div>
            <span>Phương thức thanh toán</span>
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <form className='paymentForm' onSubmit={onSubmit}>
          <div className='paymentForm__step'>{step}</div>
          {cartProducts?.length < 1 || currentStepIndex === 3 ? null : (
            <Form.GroupButton
              back={back}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              textSubmit='Thanh toán'
              isLoading={isBuyProductsLoading}
            />
          )}
        </form>
      </FormProvider>
    </div>
  )
}

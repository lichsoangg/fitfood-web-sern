import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './ProductInput.scss'
import { InputButton } from '../../../../../../components/Buttons/Buttons'
import Form from '../../../../../../components/Form/Form'
import { useGetProductTypesQuery } from '../../../../../../features/typeProduct/typeProductApi'
import Error from '../../../../../../components/Error/Error'
import { useAddProductMutation, useUpdateProductMutation } from '../../../../../../features/products/productsApi'
import { ErrorNotify, SuccessNotify } from '../../../../../../components/Notify/Notify'
import { HIGHLIGHTS } from '../../../../../../constants/utils'
import Loading from '../../../../../../components/Loading/Loading'

const schema = yup.object({
  Name: yup.string().required('Tên sản phấm là bắt buộc'),
  ProductTypeID: yup.string().required('Loại sản phẩm là bắt buộc'),
  Price: yup
    .string()
    .required('Giá sản phẩm là bắt buộc')
    .matches(/^[0-9]+$/, 'Giá sản phẩm phải là số (>=0)'),
  Quantity: yup
    .string()
    .required('Số lượng là bắt buộc')
    .matches(/^[0-9]+$/, 'Số lượng phải là số (>=0)'),
  Unit: yup.string().required('Đơn vị tính là bắt buộc')
})
const ProductInput = React.forwardRef(({ editProduct, setOpenInputProduct, setEditProduct, ...rest }, ref) => {
  const [fileAvatar, setFileAvatar] = useState(null)
  const [highlight, setHighlight] = useState(false)
  const methods = useForm({ resolver: yupResolver(schema) })
  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = methods
  const { data: productTypesData, isFetching: isFetChingProductTypes } = useGetProductTypesQuery()
  const productTypes = productTypesData?.data?.map((productType) => {
    return { id: productType.ProductTypeID, value: productType.Name }
  })
  const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation()
  const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation()
  const onSubmit = async (data) => {
    let formData = new FormData()
    let isValid = true
    for (const key in data) {
      formData.append(key, data[key])
    }
    formData.delete('Highlight')
    formData.append('Highlight', highlight ? 2 : 1)
    if (fileAvatar) {
      formData.append('ProductAvatar', fileAvatar)
    } else {
      if (!editProduct) {
        isValid = false
        setError('fileProductAvatar', { type: 'custom', message: 'Ảnh sản phẩm không được thiếu' })
      }
    }
    if (isValid) {
      try {
        let response
        if (!editProduct) {
          response = await addProduct(formData).unwrap()
        } else {
          response = await updateProduct(formData).unwrap()
        }
        if (response?.status === 200) {
          setOpenInputProduct(false)
          setEditProduct(null)
          SuccessNotify(`${!editProduct ? 'Thêm sản phẩm thành công' : 'Cập nhật sản phẩm thành công'}`)
        }
      } catch (error) {
        ErrorNotify(error?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (editProduct) {
      const { ProductTypeName, SoldQuantity, Rating, Avatar, ...resetData } = editProduct
      reset(resetData)
      if (resetData.Highlight === HIGHLIGHTS.YES) {
        setHighlight(true)
      }
      if (resetData.Highlight === HIGHLIGHTS.NO) {
        setHighlight(false)
      }
    }
  }, [editProduct, reset])
  return (
    <div className='productInput' {...rest} ref={ref}>
      {isUpdateProductLoading || isAddProductLoading ? <Loading full size={3} /> : null}
      <FormProvider {...methods}>
        <form className='productInput__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='productInput__form--top productInput__form--top-left'>
            <div className='avatar'>
              {fileAvatar && <img src={URL.createObjectURL(fileAvatar)} alt='' />}
              {!fileAvatar && (
                <img src={editProduct ? editProduct.Avatar : null} alt='' style={{ border: '1px dashed #111112' }} />
              )}
            </div>

            <div className='button'>
              <InputButton onChange={(e) => setFileAvatar(e.target.files[0])}>
                {editProduct ? `Đổi ảnh sản phẩm` : `Thêm ảnh sản phẩm`}
              </InputButton>
            </div>

            <div className='highlight' onClick={() => setHighlight(!highlight)}>
              <input type='checkbox' checked={highlight} />
              <span>Sản phẩm nổi bật</span>
            </div>
          </div>
          <div className='productInput__form--top productInput__form--top-right'>
            <Form.Input name='Name' placeHolder='Tên sản phẩm' />
            <Form.Dropdown
              name='ProductTypeID'
              placeHolder='Loại sản phẩm'
              data={productTypes}
              isLoading={isFetChingProductTypes}
            />
            <Form.Input name='Price' placeHolder='Giá sản phẩm' />
            <Form.Input name='Quantity' placeHolder='Số lượng tồn kho' />
            <Form.Input name='Unit' placeHolder='Đơn vị tính' />
          </div>
          {/* {addProductError && <Error>{addProductError?.data?.message}</Error>} */}
          {errors?.fileProductAvatar ? <Error>{errors?.fileProductAvatar?.message}</Error> : null}
          <Form.SubmitButton text={editProduct ? `Cập nhật sản phẩm` : `Thêm sản phẩm`} />
        </form>
      </FormProvider>
    </div>
  )
})
export default ProductInput

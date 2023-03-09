import React from 'react'
import { useParams } from 'react-router-dom'
import { getIdFromUrl } from '../../utils/utils'

export default function ProductDetail() {
  const { productUrl } = useParams()
  const productID = Number(getIdFromUrl(productUrl))

  return <div>ProductDetail</div>
}

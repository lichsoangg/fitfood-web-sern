import { apiSlice } from '../api/apiSlice'

export const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/purchase/add-to-cart',
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    })
  })
})

export const { useAddToCartMutation } = purchaseApi

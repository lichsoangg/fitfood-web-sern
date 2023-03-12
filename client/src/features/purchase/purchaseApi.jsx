import { apiSlice } from '../api/apiSlice'
function providesPurchase(resultsWithIds, tagType) {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ ProductID }) => ({ type: tagType, id: ProductID }))]
    : [{ type: tagType, id: 'LIST' }]
}

export const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/purchase/add-to-cart',
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
    getPurchase: builder.query({
      query: (queryConfig) => ({
        url: '/purchase',
        method: 'GET',
        credentials: 'include',
        params: queryConfig
      }),
      providesTags: (result) => providesPurchase(result?.data?.data, 'Cart')
    }),
    getBill: builder.query({
      query: (queryConfig) => ({
        url: '/purchase',
        method: 'GET',
        credentials: 'include',
        params: queryConfig
      }),
      providesTags: (result) => providesPurchase(result?.data?.data, 'Bill')
    }),
    buyProducts: builder.mutation({
      query: (data) => ({
        url: '/purchase/buy-products',
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'LIST' },
        { type: 'Bill', id: 'LIST' }
      ]
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: '/purchase/update-cart',
        method: 'PUT',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
    deleteCart: builder.mutation({
      query: (data) => ({
        url: '/purchase/',
        method: 'DELETE',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    })
  })
})

export const {
  useAddToCartMutation,
  useBuyProductsMutation,
  useGetPurchaseQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetBillQuery
} = purchaseApi

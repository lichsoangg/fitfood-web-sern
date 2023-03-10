import { apiSlice } from '../api/apiSlice'

export const typeProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductTypes: builder.query({
      query: (queryConfig) => {
        return {
          url: '/product-type',
          method: 'GET',
          params: queryConfig
        }
      },
      providesTags: ['product-type']
    })
  })
})

export const { useGetProductTypesQuery } = typeProductApi

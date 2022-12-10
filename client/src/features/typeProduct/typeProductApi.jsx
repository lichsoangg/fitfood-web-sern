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
    }),
    addEmployee: builder.mutation({
      query: (data) => ({
        url: '/employees/add',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Employees']
    }),
    updateEmployee: builder.mutation({
      query: ({ Username, data }) => {
        return {
          url: `/employees/${Username}`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['Employees']
    })
  })
})

export const { useGetProductTypesQuery } = typeProductApi

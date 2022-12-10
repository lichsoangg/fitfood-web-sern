import { apiSlice } from '../api/apiSlice'

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryConfig) => {
        return {
          url: '/products',
          method: 'GET',
          params: queryConfig
        }
      },
      providesTags: ['Products']
    }),
    //   addEmployee: builder.mutation({
    //     query: (data) => ({
    //       url: '/employees/add',
    //       method: 'POST',
    //       body: data
    //     }),
    //     invalidatesTags: ['Employees']
    //   }),
    //   updateEmployee: builder.mutation({
    //     query: ({ Username, data }) => {
    //       return {
    //         url: `/employees/${Username}`,
    //         method: 'PUT',
    //         body: data
    //       }
    //     },
    //     invalidatesTags: ['Employees']
    //   })
  })
})

export const { useGetProductsQuery } = productsApi

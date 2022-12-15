import { apiSlice } from '../api/apiSlice'

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (queryConfig) => {
        return {
          url: '/employees',
          method: 'GET',
          params: queryConfig
        }
      }
    }),
    updateEmployee: builder.mutation({
      query: ({ Username, data }) => {
        return {
          url: `/employees/${Username}`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['Account']
    })
  })
})

export const { useGetEmployeesQuery, useUpdateEmployeeMutation } = employeesApi

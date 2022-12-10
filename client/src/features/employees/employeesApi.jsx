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
      },
      providesTags: ['Employees']
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

export const { useGetEmployeesQuery, useUpdateEmployeeMutation, useAddEmployeeMutation } = employeesApi

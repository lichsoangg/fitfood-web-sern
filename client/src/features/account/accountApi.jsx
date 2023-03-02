import { apiSlice } from '../api/apiSlice'

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/user/me',
      providesTags: ['Account']
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/user/update-password',
        method: 'POST',
        body: data
      })
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: '/user/update',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Account']
    })
  })
})

export const { useGetMeQuery, useChangePasswordMutation, useUpdateAccountMutation } = accountApi

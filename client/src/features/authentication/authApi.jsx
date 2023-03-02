import { apiSlice } from '../api/apiSlice.jsx'

export const registerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
        credentials: 'include'
      }),
      invalidatesTags: ['Account']
    }),
    addNewCustomer: builder.mutation({
      query: (customer) => ({
        url: '/auth/register',
        method: 'POST',
        body: customer,
        credentials: 'include'
      }),
      invalidatesTags: ['Account']
    }),
    checkUsername: builder.mutation({
      query: (data) => ({
        url: '/auth/check-username',
        method: 'POST',
        body: data
      })
    }),
    checkPhoneNumber: builder.mutation({
      query: (data) => ({
        url: '/auth/check-phone-number',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['Account']
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Account']
    }),
    sendVerifyEmail: builder.mutation({
      query: () => ({
        url: '/auth/send-email-verify',
        method: 'POST'
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useAddNewCustomerMutation,
  useCheckUsernameMutation,
  useCheckPhoneNumberMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useSendVerifyEmailMutation,
  useResetPasswordMutation
} = registerAPI

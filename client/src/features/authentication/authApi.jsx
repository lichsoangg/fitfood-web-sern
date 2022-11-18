import { apiSlice } from '../api/apiSlice.jsx';

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
        url: '/auth/checkusername',
        method: 'POST',
        body: data
      })
    }),
    checkPhoneNumber: builder.mutation({
      query: (data) => ({
        url: '/auth/checkphonenumber',
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
    })
  })
});

export const {
  useAddNewCustomerMutation,
  useCheckUsernameMutation,
  useCheckPhoneNumberMutation,
  useLoginMutation,
  useLogoutMutation
} = registerAPI;

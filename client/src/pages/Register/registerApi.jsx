import { apiSlice } from "../../features/api/apiSlice.js";


export const registerAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewCustomer: builder.mutation({
            query: customer => ({
                url: "/auth/register",
                method: 'POST',
                body: customer,
                credentials: 'include'
            })
        }),
        checkUsername: builder.mutation({
            query: data => ({
                url: "/auth/ch`eckusername",
                method: 'POST',
                body: data,
            })
        }),
        checkPhoneNumber: builder.mutation({
            query: data => ({
                url: "/auth/checkphonenumber",
                method: 'POST',
                body: data,
            })
        })

    })
});

export const { useAddNewCustomerMutation, useCheckUsernameMutation, useCheckPhoneNumberMutation } = registerAPI;   

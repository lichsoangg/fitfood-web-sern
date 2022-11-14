import { apiSlice } from "../api/apiSlice";

export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => "/user/me",
            providesTags: ['Account'],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url:"/user/updatepassword",
                method: "POST",
                body: data
            })
        })

    })
});

export const { useGetMeQuery, useChangePasswordMutation} = accountApi;
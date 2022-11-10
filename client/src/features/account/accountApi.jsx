import { apiSlice } from "../api/apiSlice";

export const accountApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMe: builder.query({
            query:()=>"/user/me",
            providesTags: ['Account'],
        }),
     
    })
})

export const {useGetMeQuery}=accountApi;
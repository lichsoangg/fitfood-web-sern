import { apiSlice } from "../../features/api/apiSlice";

const userApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers: builder.query({
            query: ()=>'/user/getusers'
        })
    })
})

export const {useGetUsersQuery}=userApi;
import { apiSlice} from "../../features/api/apiSlice";

export const loginApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query: user=>({
                url:"/auth/login",
                method:'POST',
                body:user,
                credentials:'include'
            }),
        })
    })
})

export const {useLoginMutation} = loginApi;
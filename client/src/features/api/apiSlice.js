import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../authSlice";

const baseQuery=fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_FITFOOD_URL,
    credentials:"include",
    prepareHeaders:(headers,{getState})=>{
        const token=getState().auth.data.accessToken;
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions);
    if (result?.error?.status===401){
        console.log("sending refresh token");
        const refreshResult=await baseQuery('/auth/refresh',api,extraOptions);
        console.log("🚀 ~ refreshResult", refreshResult)
      
        if(refreshResult?.data){
            const user=api.getState().auth.data;
            api.dispatch(setCredentials(user.username,user.isAdmin,refreshResult.data.accessToken))
            result=await baseQuery(args,api,extraOptions);
        }
    }
    return result;
}

export const apiSlice=createApi({
    reducerPath:'api-fitfood',
    baseQuery: baseQueryWithReauth,
    endpoints: ()=>({}),
});
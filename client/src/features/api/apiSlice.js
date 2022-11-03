import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice=createApi({
    reducerPath:'api-fitfood',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_FITFOOD_URL }),
    endpoints: ()=>({}),
});
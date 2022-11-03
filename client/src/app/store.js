import {configureStore} from "@reduxjs/toolkit";
import {apiProvince} from "../features/api/apiProvince";
import { apiSlice } from "../features/api/apiSlice";
export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        [apiProvince.reducerPath]:apiProvince.reducer,
    },
    middleware:(gMC)=>  gMC().concat(apiProvince.middleware,apiSlice.middleware),
})


import {configureStore} from "@reduxjs/toolkit";
import {apiProvince} from "../features/api/apiProvince";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/authSlice"
export const store=configureStore({
    reducer:{
        'auth':authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        [apiProvince.reducerPath]:apiProvince.reducer,
    },
    middleware:(gMC)=>  gMC().concat(apiProvince.middleware,apiSlice.middleware),
})


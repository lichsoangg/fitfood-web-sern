import {configureStore} from "@reduxjs/toolkit";
import {apiProvince} from "../features/api/apiProvince";
export const store=configureStore({
    reducer:{

        [apiProvince.reducerPath]:apiProvince.reducer,
    },
    middleware:(gMC)=>  gMC().concat(apiProvince.middleware),
})


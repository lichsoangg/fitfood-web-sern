 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        username: null,
        isAdmin: null,
        accessToken: null,
    }
};
const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Set credentials
        setCredentials: {
            reducer(state, action) {
                state.data=action.payload;
            },
            prepare(username, isAdmin, accessToken) {
                return {
                    payload: {
                        username,
                        isAdmin,
                        accessToken,
                    }
                };
            }
        },
        logOut:(state,action)=>{
            state.data=initialState.data;
        }

    }
}
);
export const selectCurrentToken = (state) => state.auth.data.accessToken;

export const { setCredentials,logOut } = authSlide.actions;

export default authSlide.reducer;
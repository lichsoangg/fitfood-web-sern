import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    username: null,
    role: null,
    accessToken: null,
    isActive: null
  }
};
const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //Set credentials
    setCredentials: {
      reducer(state, action) {
        state.data = action.payload;
      },
      prepare(username, isActive, role, accessToken) {
        return {
          payload: {
            username,
            isActive,
            role,
            accessToken
          }
        };
      }
    },
    logOut: (state, action) => {
      state.data = initialState.data;
    },
    setActiveUser: (state, action) => {
      state.data.isActive = action.payload;
    }
  }
});
export const selectCurrentToken = (state) => state.auth.data.accessToken;
export const selectCurrentAuth = (state) => state.auth.data;

export const { setCredentials, logOut, setActiveUser } = authSlide.actions;

export default authSlide.reducer;

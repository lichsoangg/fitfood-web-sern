import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiProvince } from '../features/api/apiProvince';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/authentication/authSlice';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiProvince.reducerPath]: apiProvince.reducer
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gMC) =>
    gMC({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiProvince.middleware, apiSlice.middleware)
});

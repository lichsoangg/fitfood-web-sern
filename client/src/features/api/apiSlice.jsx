import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../authentication/authSlice'
import jwt_decode from 'jwt-decode'
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_FITFOOD_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept', 'application/json')
    headers.set('Cache-Control', 'no-cache')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
    const token = getState().auth.data.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    //refresh token valid
    if (refreshResult?.data) {
      const { AccessToken: accessToken } = refreshResult.data.data
      const decodeToken = jwt_decode(accessToken)
      const { Username: username, IsActive: isActive, Role: role } = decodeToken
      api.dispatch(setCredentials(username, isActive, role, accessToken))
      result = await baseQuery(args, api, extraOptions)
    }
    //refresh token invalid
    if (refreshResult?.error) {
      api.dispatch(logOut())
      await baseQuery('/auth/logout', api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api-fitfood',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Account'],
  endpoints: () => ({})
})

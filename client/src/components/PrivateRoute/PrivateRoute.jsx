import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import path from '../../constants/path'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import Unauthorized from '../../pages/Unauthorized'

export default function PrivateRoute({ requiredRole }) {
  const { accessToken: token, role } = useSelector(selectCurrentAuth)
  const location = useLocation()
  let privateRouteConstraint = null
  // if don't have token return to login page
  privateRouteConstraint = token ? <Outlet /> : <Navigate to={path.login} state={{ from: location }} />
  // if have token and  required role don't accept return to unauthorized page
  if (requiredRole?.length && token) {
    privateRouteConstraint = requiredRole.includes(Number(role)) ? <Outlet /> : <Unauthorized />
  }
  return privateRouteConstraint
}

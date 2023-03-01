import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import path from '../../constants/path'
import { ACTIVE } from '../../constants/utils'
import { selectCurrentAuth } from '../../features/authentication/authSlice'
import ActivePage from '../../pages/ActivePage/ActivePage'
import Unauthorized from '../../pages/Unauthorized'

export default function PrivateRoute({ requiredRole }) {
  const { accessToken: token, role, isActive } = useSelector(selectCurrentAuth)
  const location = useLocation()
  let privateRouteConstraint = null
  let checkAccountActiveRoute = Number(isActive) === ACTIVE.OK ? <Outlet /> : <ActivePage />
  // if don't have token return to login page
  privateRouteConstraint = token ? checkAccountActiveRoute : <Navigate to={path.login} state={{ from: location }} />
  // if have token and  required role don't accept return to unauthorized page
  if (requiredRole?.length && token) {
    privateRouteConstraint = requiredRole.includes(Number(role)) ? checkAccountActiveRoute : <Unauthorized />
  }
  return privateRouteConstraint
}

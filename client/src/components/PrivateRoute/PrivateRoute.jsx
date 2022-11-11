import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentAuth } from '../../features/authentication/authSlice';

export default function PrivateRoute({ requiredAdmin }) {
    const {accessToken:token, isAdmin}=useSelector(selectCurrentAuth);
    let privateRouteConstraint= token ? <Outlet/>:<Navigate to="/dang-nhap"/>;
    if(requiredAdmin){
      privateRouteConstraint = isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
    } 
  return (
    privateRouteConstraint
  )
} 

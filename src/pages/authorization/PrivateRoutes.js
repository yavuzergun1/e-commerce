import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';


export const PrivateRoutes = () => {
  const {isLogin} = UseAuth();
  console.log(isLogin);
  return (
      isLogin == true ? <Outlet/> : <Navigate to='/signup'/>
    )
}
import React from 'react'
import { useAuthContext } from '../context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login'/>;
}

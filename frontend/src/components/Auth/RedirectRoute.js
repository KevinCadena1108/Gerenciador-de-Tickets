import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RedirectRoute = () => {
  const user = useAuth();
  if (user.token) return <Navigate to="/dashboard" />;
  return <Outlet />;
};

export default RedirectRoute;

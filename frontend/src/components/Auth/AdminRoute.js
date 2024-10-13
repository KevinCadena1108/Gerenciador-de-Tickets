import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AdminRoute = () => {
  const user = useAuth();
  if (!user.token || !user.isAdmin) return <Navigate to={'/'} />;
  return <Outlet />;
};

export default AdminRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedAdminRoute = () => {
  const isAuthenticated = localStorage.getItem('urbannest_admin_logged_in') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;

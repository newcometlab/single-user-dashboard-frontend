import React, { ReactNode } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;

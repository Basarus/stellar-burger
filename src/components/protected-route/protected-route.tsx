import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  if (token === null) {
    return <Navigate to='/login' />;
  } else return <>{children}</>;
};

export const ProtectedRouteAuth = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Navigate to='/' />;
  } else return <>{children}</>;
};

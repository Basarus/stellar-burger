import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const token = localStorage.getItem('token');
  if (token === null) {
    return <Navigate to='/login' />;
  } else return <>{children}</>;
};

import React from 'react';
import { useUserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, admin }) {
  const { user } = useUserContext();

  if (!user || (admin && !user.isAdmin)) {
    return <Navigate to={'/'} replace={true} />;
  }

  return children;
}

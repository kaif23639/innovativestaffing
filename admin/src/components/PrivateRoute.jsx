import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ admin, children }) {
  if (!admin || !admin.token) {
    return <Navigate to="/login" />;
  }
  return children;
}

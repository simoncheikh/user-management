import { Navigate } from 'react-router';
import { useSessionStore } from '../stores/sessionStore/sessionStore';
import { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated());

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


import { JSX } from 'react';
import { Navigate } from 'react-router';
import { useSessionStore } from '../stores/sessionStore/sessionStore';

export const AuthenticationRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated());

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};


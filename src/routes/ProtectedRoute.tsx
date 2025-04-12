import { Navigate } from "react-router";
import { useSessionStore } from "../stores/sessionStore/sessionStore";
import { PropsWithChildren } from "react";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const isLoggedIn = useSessionStore((s) => Boolean(s.isLoggedIn))
    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
    return children
}
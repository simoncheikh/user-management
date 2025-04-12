import { PropsWithChildren } from "react";
import { useSessionStore } from "../stores/sessionStore/sessionStore";
import { Navigate } from "react-router";

export const AuthenticationRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const isLoggedIn = useSessionStore((s) => s.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }
    return children
}
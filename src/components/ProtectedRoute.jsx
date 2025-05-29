import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn, redirectTo }) {
    if (isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}

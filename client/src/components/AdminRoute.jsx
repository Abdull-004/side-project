import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute({ children }) {
    const { user, ready } = useAuth();
    if (!ready) return null;
    return user?.role === "admin" ? children : <Navigate to="/" replace />;
}

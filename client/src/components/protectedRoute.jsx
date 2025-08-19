// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function AdminRoute({ children }) {
    const { user, ready } = useAuth();

    if (!ready) return null; // Wait until auth state is loaded

    // Check if logged in and role is admin
    return user && user.role === "admin" ? children : <Navigate to="/login" replace />;
}

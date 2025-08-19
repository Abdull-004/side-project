import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        api.get("/auth/me").then(({ data }) => { setUser(data); setReady(true); }).catch(() => setReady(true));
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        setUser(data);
    };
    const signup = async (payload) => {
        const { data } = await api.post("/auth/register", payload);
        setUser(data);
    };
    const logout = async () => {
        await api.post("/auth/logout"); setUser(null);
    };

    return <AuthCtx.Provider value={{ user, ready, login, signup, logout }}>{children}</AuthCtx.Provider>;
}

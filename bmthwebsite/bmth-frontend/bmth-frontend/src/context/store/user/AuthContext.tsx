import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../../../services/api/helper";

type AuthState = { user: null | { email: string }; loading: boolean };
const AuthContext = createContext<{ auth: AuthState; logout: () => void }>({
    auth: { user: null, loading: true },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthState>({ user: null, loading: true });
    useEffect(() => {
        apiFetch<{ email: string }>("/api/auth/me")
            .then((user) => setAuth({ user, loading: false }))
            .catch(() => setAuth({ user: null, loading: false }))
    }, []);

    const logout = () => setAuth({ user: null, loading: false });
    return <AuthContext.Provider value={{ auth, logout}}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
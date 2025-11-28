import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../../../services/api/helper";

type User = { userId: string; email: string; role: string };
type AuthState = { user: User | null; loading: boolean };
const AuthContext = createContext<{ auth: AuthState; logout: () => void; refreshAuth: () => Promise<void> }>({
    auth: { user: null, loading: true },
    logout: () => {},
    refreshAuth: async () => {},
});

export function AuthProvider ({ children }: Readonly<{ children: React.ReactNode }>) {
    const [auth, setAuth] = useState<AuthState>({ user: null, loading: true });

    const refreshAuth = async () => {
        try {
            const user = await apiFetch<User>("/api/auth/me");
            setAuth({ user, loading: false })
        }
        catch {
            setAuth({ user: null, loading: false })
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const logout = () => setAuth({ user: null, loading: false });

    return <AuthContext.Provider value={{ auth, logout, refreshAuth }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/auth/me`, { credentials: 'include' })
            .then((res) => (res.ok ? res.json() : null))
            .then(setUser)
            .catch(() => {
                setUser(null)
                console.error
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } finally {
            // Même si la requête échoue, on déconnecte côté UI
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
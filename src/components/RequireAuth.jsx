import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';

export function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p>Chargement...</p>
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />

    return children;
}
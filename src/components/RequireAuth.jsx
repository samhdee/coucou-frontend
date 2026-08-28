import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router';

export function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()

    if (loading) return <p>Chargement...</p>
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />

    return children;
}
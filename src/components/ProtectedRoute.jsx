// components/ProtectedRoute.jsx
import {Navigate, Outlet, useLocation} from 'react-router';
import {useAuth} from '../auth/context/AuthContext.jsx';

export default function ProtectedRoute() {
    const {user, isLoading} = useAuth()
    const location = useLocation()

    if (isLoading) {
        return <p>Chargement…</p>
    }

    if (!user) {
        return <Navigate to="/" state={{from: location}} replace/>
    }

    return <Outlet/>;
}
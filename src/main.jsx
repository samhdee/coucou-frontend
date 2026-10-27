import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";

import CreateTimer from './CreateTimer.jsx'
import ViewTimer from "./ViewTimer.jsx";
import Dashboard from './Dashboard.jsx';
import { AuthProvider } from './auth/context/AuthContext.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            {/*<AuthProvider>*/}
                <Routes>
                    <Route path="/" element={<CreateTimer />} />
                    <Route path="/timer/:uuid" element={<ViewTimer />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                </Routes>
            {/*</AuthProvider>*/}
        </BrowserRouter>
    </StrictMode>,
)

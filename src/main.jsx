import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreateTimer from './CreateTimer.jsx'
import ViewTimer from "./ViewTimer.jsx";
import ViewSevenByNine from "./ViewSevenByNine.jsx";
import Dashboard from './Dashboard.jsx';
import { AuthProvider } from './auth/context/AuthContext.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';
import User from './components/User.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <header>
                        <User />
                    </header>

                    <Routes>
                        <Route path="/" element={<CreateTimer />} />
                        <Route path="/timer/:id" element={<ViewTimer />} />
                        <Route path="/seven-by-nine/:id" element={<ViewSevenByNine />} />
                        <Route path="/dashboard" element={
                            <RequireAuth><Dashboard /></RequireAuth>
                        } />
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
)

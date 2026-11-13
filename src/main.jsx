import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {Container} from "react-bootstrap";

import CreateTimer from './CreateTimer.jsx'
import ViewSession from "./ViewSession.jsx";
import ViewSevenByNine from "./ViewSevenByNine.jsx";
import { AuthProvider } from './auth/context/AuthContext.jsx';
import User from './components/User.jsx';

import "../styles/app.scss"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <header>
                        <User />
                    </header>

                    <div id="main-container">
                        <Routes>
                            <Route path="/" element={<CreateTimer />} />
                            <Route path="/session/:id" element={<ViewSession />} />
                            <Route path="/seven-by-nine/:id" element={<ViewSevenByNine />} />
                        </Routes>
                    </div>

                    <footer>
                        <Container fluid={"md"} className="text-center">
                            <a
                                href="https://github.com/stars/samhdee/lists/coucou"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </Container>
                    </footer>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
)

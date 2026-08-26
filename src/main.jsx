import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";

import CreateTimer from './CreateTimer.jsx'
import ViewTimer from "./ViewTimer.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateTimer />} />
                <Route path="/timer/:uuid" element={<ViewTimer />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)

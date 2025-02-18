import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryDetails } from './routes/CountryDetails.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme>
            <BrowserRouter>
                <Routes>
                    <Route path="/:country" element={<CountryDetails />} />
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Theme>
    </StrictMode>
)
